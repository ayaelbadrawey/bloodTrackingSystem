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

        const instantiateDonation = await contract.submitTransaction('instantiateDonation2');
        console.log(' instantiate Donation complete.');
        
        const instantiateTransportation = await contract.submitTransaction('instantiateTrasnprtation2');
        console.log(' instantiate under transportation complete.');

        const instantiateDeliverd = await contract.submitTransaction('instantiateDelivered2');
        console.log(' instantiate delivered complete.');

        const instantiateUsed = await contract.submitTransaction('instantiateused2');
        console.log(' instantiate delivered complete.');

        const instantiateRecieve = await contract.submitTransaction('instantiateRecieve2');
        console.log(' instantiate delivered complete.');
      

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