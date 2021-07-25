'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Blood = require('../contract/lib/blood');

const wallet = new FileSystemWallet('../identity/user/isabella/wallet');

// Main program function
async function main() {

    const gateway = new Gateway();

    try {
        const userName = 'User1@org1.example.com';
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('mychannel');

        const contract = await network.getContract('bloodcontract');


        //instantiate data set
        //const instantiateBlood = await contract.submitTransaction('instantiateBlood');
        //console.log(' instantiate blood complete.');

        const instantiateDonation = await contract.submitTransaction('instantiateDonation');
        console.log(' instantiate Donation complete.');
        
        const instantiateTransportation = await contract.submitTransaction('instantiateTrasnprtation');
        console.log(' instantiate under transportation complete.');

        const instantiateDeliverd = await contract.submitTransaction('instantiateDelivered');
        console.log(' instantiate delivered complete.');

        const instantiateUsed = await contract.submitTransaction('instantiateused');
        console.log(' instantiate used complete.');

        const instantiateRecieve = await contract.submitTransaction('instantiateRecieve');
        console.log(' instantiate recieve complete.');

        //test cases

        //add blood "BD1500:B-" "BB100" "D100" state=>ready
        const test1 = await contract.submitTransaction(' createBloodBag','BD1500','B-','25/7/2021','20/10/2021','SAFE','D100','4','25/7/2021 12:00:00','BB100');
        console.log("test1",test1)

        //add blood "BD1501:AB-" "BB100" "D101" state=>under transportation
        const test2 = await contract.submitTransaction(' createBloodBag','BD1501','AB-','7/7/2021','2/10/2021','SAFE','D101','3','7/7/2021 12:00:00','BB100');
        console.log("test2",test2)

        const test3 = await contract.submitTransaction(' underTransportBloodDIN','BD1501:AB-','7/30/2021 06:30:00');
        console.log("test3",test3)

        //add blood "BD1502:O+" "BB101" "D101" "H100" state=>under delivered
        const test4 = await contract.submitTransaction(' createBloodBag','BD1502','O+','1/7/2021','30/9/2021','SAFE','D101','5','1/7/2021 12:00:00','BB101');
        console.log("test4",test4)

        const test5 = await contract.submitTransaction(' underTransportBloodDIN','BD1502:O+','3/7/2021 06:30:00');
        console.log("test5",test5)

        const test6 = await contract.submitTransaction(' delieveredBloodDIN','BD1502:O+','3/7/2021 09:40:00');
        console.log("test6",test6)

      

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});