require ('dotenv').config();

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

const Blood = require('../../bloodbank/contract/lib/blood');
const wallet = new FileSystemWallet('../identity/user/mark/wallet');


const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000 ;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.get('/', function (req, res){
    res.send('Blood-Tracking is running 🚀');
});

app.set('port', PORT);

app.route('/query/bag').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Client@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('bloodcontract');

        console.log('--------------------Query Blood Bag--------------------');
        const qBagResponse1 = await contract.evaluateTransaction('queryBloodBag', 'BD500:AB+');
        console.log(`${qBagResponse1.toString()}`);
        console.log('Transaction complete.');

        const output = qBagResponse1.toString()

        res.status(200).json({
            output
        });
    }
     catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

}   finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

}
    
});

app.route('/get/history').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Client@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('bloodcontract');

        console.log('--------------------History of Blood Bag--------------------');
        const historyResponse = await contract.evaluateTransaction('getHistoryForBloodBag', 'BD244:O-');
        console.log(`${historyResponse.toString()}`);
        console.log('Transaction complete.');

        const output = historyResponse.toString()

        res.status(200).json({
            output
        });
    }
     catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

}   finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

}
    
});

app.route('/query/donor').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Client@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('bloodcontract');

        console.log('--------------------Query Blood Bags of Donor--------------------');
        const qdonorResponse = await contract.evaluateTransaction('queryDonorOwner', 'D101');
        console.log(`${qdonorResponse.toString()}`);
        console.log('Transaction complete.');

        const output = qdonorResponse.toString()

        res.status(200).json({
            output
        });
    }
     catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

}   finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

}
    
});

app.route('/query/patient').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Client@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('bloodcontract');

        console.log('--------------------Query Blood Bags of Patient--------------------');
        const qpatientResponse = await contract.evaluateTransaction('queryPatientOwner', 'R106');
        console.log(`${qpatientResponse.toString()}`);
        console.log('Transaction complete.');

        const output = qpatientResponse.toString()

        res.status(200).json({
            output
        });
    }
     catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

}   finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

}
    
});

app.route('/search/type').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Client@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('bloodcontract');

        console.log('--------------------Search for Blood TYpe--------------------');
        const changeResponse = await contract.submitTransaction('searchBloodType', 'AB+');
        console.log(`${changeResponse.toString()}`);
        console.log('Transaction complete.');

        const output = changeResponse.toString()

        res.status(200).json({
            output
        });
    }
     catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

}   finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

}
    
});

httpServer.listen(PORT, () => {
    console.log('Server running on port', PORT);
});

