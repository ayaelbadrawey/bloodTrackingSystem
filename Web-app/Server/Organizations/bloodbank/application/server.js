require ('dotenv').config();

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

const Blood = require('../contract/lib/blood');
const wallet = new FileSystemWallet('../identity/user/isabella/wallet');


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
        const userName = 'User1@org1.example.com';

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
        const qBagResponse1 = await contract.evaluateTransaction('queryBloodBag', 'BD520:O+');
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

app.route('/create/bag').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Create Blood Bag--------------------');
        const createResponse = await contract.submitTransaction('createBloodBag', 'BD500', '400', 'AB+', '30-May-2021', '11-July-2021', 'SAFE', 'D560', '4', '30-May-2021 11:00:00', 'BB101');
        console.log(`${createResponse.toString()}`);
        console.log('Transaction complete.');

        const output = createResponse.toString()

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

app.route('/first/state').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Under Transportation Blood DIN--------------------');
        const stateResponse1 = await contract.submitTransaction('underTransportBloodDIN', 'BD500:AB+', '31-May-2021 11:00:00');
        console.log(`${stateResponse1.toString()}`);
        console.log('Transaction complete.');

        const output = stateResponse1.toString()

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

app.route('/change/location').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Change Blood Bag Location--------------------');
        const changeResponse = await contract.submitTransaction('changeBloodBagLocation', 'BD500:AB+', 'TRANSPORTATION_CAR', 'BB101','31-May-2021 12:25:00');
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

app.route('/get/history').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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
        const historyResponse = await contract.evaluateTransaction('getHistoryForBloodBag', 'BD520:O+');
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

app.route('/query/bloodbank').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Query Blood Bags of Blood Bank--------------------');
        const qbloodbankResponse = await contract.evaluateTransaction('queryBloodBankOwner', 'BB104');
        console.log(`${qbloodbankResponse.toString()}`);
        console.log('Transaction complete.');

        const output = qbloodbankResponse.toString()

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

app.route('/query/process').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Query Processes--------------------');
        const qprocessResponse1 = await contract.evaluateTransaction('queryProcess', 'P265:donate');
        console.log(`${qprocessResponse1.toString()}`);
        console.log('Transaction complete.');

        const output = qprocessResponse1.toString()

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

app.route('/create/process').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Create Process--------------------');
        const createResponse2 = await contract.submitTransaction('createProcess', 'P500', 'BD500:AB+', 'D500', 'BB101', 'donate', '30-May-2021');
        console.log(`${createResponse2.toString()}`);
        console.log('Transaction complete.');

        const output = createResponse2.toString()

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
app.route('/query/all/process').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        const userName = 'User1@org1.example.com';

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

        console.log('--------------------Query All Processes--------------------');
        const qprocessResponse2 = await contract.evaluateTransaction('queryAllProcess');
        console.log(`${qprocessResponse2.toString()}`);
        console.log('Transaction complete.');

        const output = qprocessResponse2.toString()

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

