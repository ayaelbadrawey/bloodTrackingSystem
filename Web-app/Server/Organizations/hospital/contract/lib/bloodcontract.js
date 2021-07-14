/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');
const xlsx = require ("xlsx");


// PaperNet specifc classes
const Blood  = require('./blood');
const Process = require('./process');
const BloodList = require('./bloodlist');
const ProcessList = require('./processlist');


// Enumerate commercial paper state values
const DINSTATE = {
    READY: 'READY',
    UNDER_TRANSPORTATION: 'UNDER_TRANSPORTATION',
    DELIEVERED: 'DELIEVERED',
    USED: 'USED'
};
const LOCATION = {
    BLOOD_BANK : 'BLOOD_BANK',
    TRANSPORTATION_CAR : 'TRANSPORTATION_CAR',
    HOSPITAL : 'HOSPITAL',
    PATIENT  : 'PATIENT'

};

/**
 * A custom context provides easy access to list of all blood bags
 */
class BloodContext extends Context {

    constructor() {
        super();
        this.bloodList = new BloodList(this);
        this.processList = new ProcessList(this);
    }

}

/**
 * Define Blood Smart Contract
 *
 */
class BloodContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.blood');
    }

    /**
     * Define a custom context for blood
    */
    createContext() {
        return new BloodContext();
    }


    /** Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateBlood(ctx) {
    
        console.log('============= ADD BLOOD ===========');
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true});
        var ws_blood = wb.Sheets["Blood"];
        console.log('read sheet');
        const bloodData = xlsx.utils.sheet_to_json(ws_blood, {raw:false});
        console.log(bloodData[0]);
        for (let i = 0; i < bloodData.length; i++) {
            const timeStamp = bloodData[i].date+ " " + bloodData[i].time; 
            const blood = Blood.createInstance(bloodData[i].DIN, bloodData[i].mm, bloodData[i].type, bloodData[i].date, bloodData[i].expired, bloodData[i].test, bloodData[i].donorID, bloodData[i].temperature, timeStamp,bloodData[i].ownerID);
            await ctx.bloodList.addBlood(blood);
            console.log('==========Blood Added============');
         }
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateTrasnprtation(ctx){
        console.log('============= ADD UNDER TRANSPORTATION STATES ===========');
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true}); 
        var ws_tran = wb.Sheets["Under_Transportation"];
        var tran = xlsx.utils.sheet_to_json(ws_tran, {raw:false});
        console.log(tran[0]);
        for (let i = 0; i < tran.length; i++) {
            const timeStamp = tran[i].date+ " " + tran[i].time; 
            const bloodNumber = tran[i].bloodNumber;
            console.log('============= START : underTransportationBloodDIN ===========');

            // Check whether the blood bag exists
            if (! await ctx.bloodList.bagExists(bloodNumber)) {
                throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
            }

            // Get blood bag by blood number
            const blood = await ctx.bloodList.getBlood(bloodNumber);


            //check if location is blood bank
            if(blood.location != LOCATION.BLOOD_BANK){
                throw new Error(`Error location is not valid`);
            }

            //check if test is safe
            if(blood.test != "SAFE"){
                throw new Error(`Error this bag is not safe to be transported`);
            }

            // If state is not equal to ready
            if (blood.currentState != DINSTATE.READY) {
                throw new Error(`Error blood bag state is not valid`);
            }
            // Change din state to "UNDER_TRANSPORTATION"
            blood.currentState = DINSTATE.UNDER_TRANSPORTATION;
            blood.timeStamp = timeStamp;
            // Update state in ledger
            await ctx.bloodList.updateBlood(blood);

            ctx.stub.setEvent('UNER_TRANSPORTATION_DIN', blood.toBuffer());
            console.log('============= END : underTransportationBloodDIN ===========');
            //change the location
           console.log('============= START : Change Blood Bag Owner ===========');
            const location = LOCATION.TRANSPORTATION_CAR;
            const currentOwner = LOCATION.TRANSPORTATION_CAR;
           //check if location is transportation
           if(location == LOCATION.TRANSPORTATION_CAR){
               if(blood.currentState != DINSTATE.UNDER_TRANSPORTATION){
                   throw new Error(`Error we can't change location`);
               }
           }
           //check if location is hospital
           if(location == LOCATION.HOSPITAL){
               if(blood.currentState != DINSTATE.DELIEVERED){
                   throw new Error(`Error we can't change location`);
               }
           }
           //check if location is patient
           if(location == LOCATION.PATIENT){
               if(blood.currentState !== DINSTATE.USED){
                   throw new Error(`Error we can't change location`);
               }
           }
           // Change blood bag location
           blood.location = location;
   
           // Change blood bag owner
           blood.ownerID = currentOwner; 
           blood.timeStamp = timeStamp
   
           // Update state in ledger
           await ctx.bloodList.updateBlood(blood);
           console.log('============= END : changeBloodBagOwner ===========');
            console.log('==========Transportation State Added============');
         }
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateDonation(ctx){
        console.log('============= ADD DONATION ==========='); 
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true});

        var ws_don = wb.Sheets["Donation"];
        var donation = xlsx.utils.sheet_to_json(ws_don, {raw:false});

        console.log(donation[0]);
        for (let i = 0; i < donation.length; i++) {
            const timeStamp = donation[i].date+ " " + donation[i].time; 
            const process = Process.createInstance(donation[i].processID,donation[i].bloodNumber ,donation[i].userID,donation[i].ownerID,'donate',timeStamp);
            await ctx.processList.addProcess(process);
            console.log('==========Donation Added============');
         }
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateDelivered(ctx){

        console.log('============= ADD DELIVERED STATE ==========='); 
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true});

        var ws_del = wb.Sheets["DELIEVERED"];
        var del = xlsx.utils.sheet_to_json(ws_del, {raw:false});
       console.log(del[0]);
       for (let i = 0; i < del.length; i++) {
           const timeStamp = del[i].date+ " " + del[i].time;
            // Check if the blood bag exists
            if (! await ctx.bloodList.bagExists(del[i].bloodNumber)) {
                throw new Error(`Error blood bag  ${del[i].bloodNumber} doesn't exists `);
            } 
            // Get blood bag by blood number
            const blood = await ctx.bloodList.getBlood(del[i].bloodNumber);
            //check if location is transportation car
            if(blood.location != LOCATION.TRANSPORTATION_CAR){
                throw new Error(`Error location is not valid`);
            }
            // If state is not equal to UNDER_TRANSPORTATION
            if (blood.currentState != DINSTATE.UNDER_TRANSPORTATION) {
                throw new Error(`Error state of blood bag is not valid`);
            }
            // Set din state to "Delievered"
            blood.currentState = DINSTATE.DELIEVERED;
            blood.timeStamp = timeStamp;
            // Update state in ledger
            await ctx.bloodList.updateBlood(blood);
            ctx.stub.setEvent('DIN_DELIEVERED', blood.toBuffer());
            console.log('============= END : delieverBloodDIN ===========');

            //change the location
           console.log('============= START : Change Blood Bag Owner ===========');
           const location = LOCATION.HOSPITAL;
           const currentOwner = del[i].ownerID;
           //check if location is transportation
           if(location == LOCATION.TRANSPORTATION_CAR){
               if(blood.currentState != DINSTATE.UNDER_TRANSPORTATION){
                   throw new Error(`Error we can't change location`);
               }
           }
           //check if location is hospital
           if(location == LOCATION.HOSPITAL){
               if(blood.currentState != DINSTATE.DELIEVERED){
                   throw new Error(`Error we can't change location`);
               }
           }
           //check if location is patient
           if(location == LOCATION.PATIENT){
               if(blood.currentState !== DINSTATE.USED){
                   throw new Error(`Error we can't change location`);
               }
           }
           // Change blood bag location
           blood.location = location;
   
           // Change blood bag owner
           blood.ownerID = currentOwner; 
           blood.timeStamp = timeStamp
   
           // Update state in ledger
           await ctx.bloodList.updateBlood(blood);
           console.log('============= END : changeBloodBagOwner ===========');
   
           console.log('==========Delivered State Added============');
       }        
    
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateused(ctx){

        console.log('============= ADD USED STATE ==========='); 
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true});

        var ws_used = wb.Sheets["USED"];
        var used = xlsx.utils.sheet_to_json(ws_used, {raw:false});

       console.log(used[0]);
       for (let i = 0; i < used.length; i++) {
           const timeStamp = used[i].date+ " " + used[i].time; 
           console.log('============= START : UsedBloodDIN ===========');

           // Check if the Blood Bag exists
           if (!await ctx.bloodList.bagExists(used[i].bloodNumber)) {
               throw new Error(`Error blood bag ${used[i].bloodNumber} doesn't exists `);
           }
   
           // Get blood by blood number
           const blood = await ctx.bloodList.getBlood(used[i].bloodNumber);
   
           //check if location is hospital
           if(blood.location != LOCATION.HOSPITAL){
               throw new Error(`Error location is not valid`);
           }
   
           //check if patient id begins with r
           if(!used[i].patientID.startsWith("R")){
               throw new Error(`Error user id is not valid`);
           }
   
           blood.patientID = used[i].patientID;
   
           // If din state is not equal DELIEVERED
           if (blood.currentState != DINSTATE.DELIEVERED) {
               throw new Error(`Error state of blood bag is not valid`);
           }
           // Set din state to "USED"
           blood.currentState = DINSTATE.USED;
           blood.timeStamp = timeStamp;
           // Update state in ledger
           await ctx.bloodList.updateBlood(blood);
   
           ctx.stub.setEvent('DIN_USED', blood.toBuffer());
           console.log('============= END : usedBloodDIN ===========');
           console.log('==========Used State Added============');
        }
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiateRecieve(ctx){


        console.log('============= ADD RECIEVE ==========='); 
        const wb = xlsx.readFile("./InitialData.xlsx", {cellDates:true});

        var ws_recieve = wb.Sheets["Recieve 2"];
        var recieve = xlsx.utils.sheet_to_json(ws_recieve, {raw:false});

       console.log(recieve[0]);
       for (let i = 0; i < recieve.length; i++) {
           const timeStamp = recieve[i].date+ " " + recieve[i].time; 
           const process = Process.createInstance(recieve[i].processID,recieve[i].bloodNumbers ,recieve[i].userID,recieve[i].ownerID,'recieve',timeStamp);
           await ctx.processList.addProcess(process);
           console.log('==========Recieve Added============');
        }

    }

    /**
     * Create Blood Bag
     *
     * @param {Context} ctx the transaction context
     * @param {String} DIN blood bag DIN
     * @param {String} mm blood bag mm
     * @param {String} type blood bag type
     * @param {String} date blood bag creation date 
     * @param {String} expired blood bag expired dtae
     * @param {String} test blood bag test result
     * @param {String} donorID blood bag donor id
     * @param {String} temperature blood bag temperature
     * @param {String} ownerID blood bag temperature
    */
   async createBloodBag(ctx, DIN, mm, type, date, expired, test, donorID, temperature, timeStamp, ownerID) {

    const bloodnum = donorID + ":" + DIN;
    // Check if the blood bag already exists
    if (await ctx.bloodList.bagExists(bloodnum)) {
        throw new Error(`Blood Bag with ID ${bloodnum} is already exist`);
    }

    //check if this is a valid donor id
    if(donorID.startsWith("D")){
        // create blood bag
        let blood = Blood.createInstance(DIN, mm, type, date, expired, test, donorID, temperature, timeStamp, ownerID);
        // Append blood asset to ledger
        await ctx.bloodList.addBlood(blood);
        console.log('============= END : Add Blood Bag ===========');
        return blood;
        }
    else{
        throw new Error(`it's not a donor ID `);
        }
    }
    /**
     * Query All Blood Bags
     * @param {Context} ctx the transaction context
     */
    async queryAllBlood(ctx) {
        console.log('============= START : Query All===========');
        return await ctx.bloodList.getBloodBags();
    }
    /**
     * Query one blood bag with blood number
     * @param { Context } ctx smart contract transaction context
     * @param { bloodNumber } blood number to query
     */
    async queryBloodBag(ctx, bloodNumber){

        // Check if the blood bag exists
        if (!await ctx.bloodList.bagExists(bloodNumber)) {
            throw new Error(`Blood Bag with ID ${bloodNumber} doesn't exists`);
        }
        // Return blood asset from ledger
        return await ctx.bloodList.getBlood(bloodNumber);
    }
    /**
     * Convert to under_transportation state
     * @param { Context } ctx smart contract transaction context
     * @param { bloodNumber } blood number to query
     * @param { timeStamp } String number to query
     */
    async underTransportBloodDIN(ctx, bloodNumber, timeStamp) {
    
        console.log('============= START : underTransportationBloodDIN ===========');

        // Check whether the blood bag exists
        if (! await ctx.bloodList.bagExists(bloodNumber)) {
            throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
        }

        // Get blood bag by blood number
        const blood = await ctx.bloodList.getBlood(bloodNumber);


        //check if location is blood bank
        if(blood.location != LOCATION.BLOOD_BANK){
            throw new Error(`Error location is not valid`);
        }

        //check if test is safe
        if(blood.test != "SAFE"){
            throw new Error(`Error this bag is not safe to be transported`);
        }

        // If state is not equal to ready
        if (blood.currentState != DINSTATE.READY) {
            throw new Error(`Error blood bag state is not valid`);
        }
        // Change din state to "UNDER_TRANSPORTATION"
        blood.currentState = DINSTATE.UNDER_TRANSPORTATION;
        blood.timeStamp = timeStamp;
        // Update state in ledger
        await ctx.bloodList.updateBlood(blood);

        ctx.stub.setEvent('UNER_TRANSPORTATION_DIN', blood.toBuffer());
        console.log('============= END : underTransportationBloodDIN ===========');
    }
    /**
     * Convert to delievered state
     * @param { Context } ctx smart contract transaction context
     * @param { bloodNumber } blood number to query
     * @param { timeStamp } String
     */

     async delieveredBloodDIN(ctx, bloodNumber, timeStamp) {
        
        console.log('============= START : delieveredBloodDIN ===========');
    
        // Check if the blood bag exists
        if (! await ctx.bloodList.bagExists(bloodNumber)) {
            throw new Error(`Error blood bag  ${bloodNumber} doesn't exists `);
        }

        // Get blood bag by blood number
        const blood = await ctx.bloodList.getBlood(bloodNumber);
        
        //check if location is transportation car
        if(blood.location != LOCATION.TRANSPORTATION_CAR){
            throw new Error(`Error location is not valid`);
        }
        // If state is not equal to UNDER_TRANSPORTATION
        if (blood.currentState != DINSTATE.UNDER_TRANSPORTATION) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "Delievered"
        blood.currentState = DINSTATE.DELIEVERED;
        blood.timeStamp = timeStamp;
        // Update state in ledger
        await ctx.bloodList.updateBlood(blood);

        ctx.stub.setEvent('DIN_DELIEVERED', blood.toBuffer());
        console.log('============= END : delieverBloodDIN ===========');
    }
    /**
     * Convert to used state
     * @param { Context } ctx smart contract transaction context
     * @param { bloodNumber } blood number to issue DIN
     * @param { patientID } blood patientID\
     * @param { timeStamp } String 
     */
    async usedBloodDIN(ctx, bloodNumber, patientID, timeStamp) {
        console.log('============= START : UsedBloodDIN ===========');

        // Check if the Blood Bag exists
        if (!await ctx.bloodList.bagExists(bloodNumber)) {
            throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
        }

        // Get blood by blood number
        const blood = await ctx.bloodList.getBlood(bloodNumber);

        //check if location is hospital
        if(blood.location != LOCATION.HOSPITAL){
            throw new Error(`Error location is not valid`);
        }

        //check if patient id begins with r
        if(!patientID.startsWith("R")){
            throw new Error(`Error user id is not valid`);
        }

        blood.patientID = patientID;

        // If din state is not equal DELIEVERED
        if (blood.currentState != DINSTATE.DELIEVERED) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "USED"
        blood.currentState = DINSTATE.USED;
        blood.timeStamp = timeStamp;
        // Update state in ledger
        await ctx.bloodList.updateBlood(blood);

        ctx.stub.setEvent('DIN_USED', blood.toBuffer());
        console.log('============= END : usedBloodDIN ===========');
    }
    /**
     * Change blood bag owner/location
     * @param { Context } ctx smart contract transaction context
     * @param { bloodNumber } blood number
     * @param { location } blood location
     * @param { currentOwner } blood owner
     * @param { timeStamp } String
     */
    async changeBloodBagLocation(ctx, bloodNumber, location, currentOwner, timeStamp) {
     
        console.log('============= START : Change Blood Bag Owner ===========');

        // Get blood bag by blood number
        const blood = await ctx.bloodList.getBlood(bloodNumber);
    
        //check if location is transportation
        if(location == LOCATION.TRANSPORTATION_CAR){
            if(blood.currentState != DINSTATE.UNDER_TRANSPORTATION){
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is hospital
        if(location == LOCATION.HOSPITAL){
            if(blood.currentState != DINSTATE.DELIEVERED){
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is patient
        if(location == LOCATION.PATIENT){
            if(blood.currentState !== DINSTATE.USED){
                throw new Error(`Error we can't change location`);
            }
        }
        // Change blood bag location
        blood.location = location;

        // Change blood bag owner
        blood.currentOwner = currentOwner; 
        blood.timeStamp = timeStamp

        // Update state in ledger
        await ctx.bloodList.updateBlood(blood);
        console.log('============= END : changeBloodBagOwner ===========');

        return blood;
    }
    /**
     * @param  { Context } ctx Blood context.
     * @param  { bloodNumber } blood Blood number to return history for
     */
    async getHistoryForBloodBag(ctx, bloodNumber) {
        return await ctx.bloodList.getBloodBagHistory(bloodNumber);
    }

    /**
    * queryOwner commercial paper: supply name of owning org, to find list of blood bags based on owner field
    * @param {Context} ctx the transaction context
    * @param {String} donorID blood bag owner
    */
    async queryDonorOwner(ctx, donorID) {

        return await ctx.bloodList.queryByDonor(donorID);
    }
    /**
    * queryOwner commercial paper: supply name of owning org, to find list of blood bags based on owner field
    * @param {Context} ctx the transaction context
    * @param {String} patientID blood bag owner
    */
    async queryPatientOwner(ctx, patientID) {

        return await ctx.bloodList.queryByPatient(patientID);
    }
    /**
    * queryOwner commercial paper: supply name of owning org, to find list of blood bags based on owner field
    * @param {Context} ctx the transaction context
    * @param {String} hospitalID blood bag owner
    */
    async queryHospitalOwner(ctx, hospitalID) {

        return await ctx.processList.queryByHospital(hospitalID);
    }
    /**
    * queryOwner commercial paper: supply name of owning org, to find list of blood bags based on owner field
    * @param {Context} ctx the transaction context
    * @param {String} bloodBankID blood bag owner
    */
    async queryBloodBankOwner(ctx, bloodBankID) {

        return await ctx.processList.queryByBloodBank(bloodBankID);
    }
    /**
    * @param {Context} ctx the transaction context
    * @param {currentOwner} blood blood bag owner
    * @param {type} blood blood bag type
    * @param {currentState} blood blood bag state
    */    
    async searchBloodType(ctx, type) {
        return await ctx.bloodList.queryType(type);
    } 

     /**
      * Create a process
     * @param { Context } ctx smart contract transaction context.
     * @param { processID } String processID.
     * @param { userID } String userID.
     * @param { ownerID } String hospitalID/ bloodBankID.
     * @param { type } String type.
     * @param { date } String type.
     */
    async createProcess(ctx, processID, bloodNumber, userID, ownerID, type, date) {
 
        console.log('============= START : Create Process ===========');

        const processnum = processID + ":" + type;
        // Check if the process already exists
        if (await ctx.processList.processExists(processnum)) {
            throw new Error(`Process with ID ${processnum} is already exist`);
        }

        // Check if the blood bag exists
        if (!await ctx.bloodList.bagExists(bloodNumber)) {
            throw new Error(`Blood Bag with ID ${bloodNumber} doesn't exists`);
        }
        
        //check if process is donate that user id begins with "d"
        if(type == "donate"){
            if(!userID.startsWith("D")){
                throw new Error(`Error user id is not valid`);
            }
        }
        //check if process is recieve that user id begins with "r"
        if(type == "recieve"){
            if(!userID.startsWith("R")){
                throw new Error(`Error user id is not valid`);
            }
        }

        let process = Process.createInstance(processID, bloodNumber, userID, ownerID, type, date);
        // Append process asset to ledger
        await ctx.processList.addProcess(process);
 
        console.log('============= END : Add Process ===========');
        return process;
    }

    /**
     * Query all processes
     * @param { Context } ctx smart contract transaction context
     */
    async queryAllProcess(ctx){
        return await ctx.processList.getProcesses();
    }

    /**
     * Query a process by its number
     * @param { Context } ctx smart contract transaction context
     * @param { processNumber } process number to query
     */
    async queryProcess(ctx, processNumber) {

        // Check if the process exists
        if (!await ctx.processList.processExists(processNumber)) {
            throw new Error(`Process with ID ${processNumber} doesn't exists`);
        }

        // Return blood asset from ledger
        return await ctx.processList.getProcess(processNumber);
    }
       
}

module.exports = BloodContract;