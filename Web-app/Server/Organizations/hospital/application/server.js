require ('dotenv').config();

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

const Blood = require('../contract/lib/blood');
const wallet = new FileSystemWallet('../identity/user/balaji/wallet');


const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();
const httpServer = http.createServer(app);

const PORT = 5001 ;

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

        const id1 = req.query.id;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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
        const qBagResponse1 = await contract.evaluateTransaction('queryBloodBag', id1);
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

app.route('/second/state').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {

        const id1 = req.query.id;
        const time1 = req.query.time;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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

        console.log('--------------------Delievered Blood DIN--------------------');
        const stateResponse2 = await contract.submitTransaction('delieveredBloodDIN', id1, time1);
        console.log(`${stateResponse2.toString()}`);
        console.log('Transaction complete.');

        const output = stateResponse2.toString()

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

app.route('/third/state').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {

        const id1 = req.query.id;
        const pid1 = req.query.pid;
        const time1 = req.query.time;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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

        console.log('--------------------Used Blood DIN--------------------');
        const stateResponse3 = await contract.submitTransaction('usedBloodDIN', id1, pid1, time1);
        console.log(`${stateResponse3.toString()}`);
        console.log('Transaction complete.');

        const output = stateResponse3.toString()

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

        const id1 = req.query.id;
        const loc1 = req.query.loc;
        const oid1 = req.query.oid;
        const time1 = req.query.time1;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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
        const changeResponse = await contract.submitTransaction('changeBloodBagLocation', id1, loc1, oid1, time1);
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

        const id1 = req.query.id;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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
        const historyResponse = await contract.evaluateTransaction('getHistoryForBloodBag', id1);
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

app.route('/query/hospital').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {

        const oid1 = req.query.oid;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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

        console.log('--------------------Query Blood Bags of Hospital--------------------');
        const qhospitalResponse = await contract.evaluateTransaction('queryHospitalOwner', oid1);
        console.log(`${qhospitalResponse.toString()}`);
        console.log('Transaction complete.');

        const output = qhospitalResponse.toString()

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

        const pid1 = req.query.pid;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));
        // Load connection profile; will be used to locate a gateway

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
        const qprocessResponse1 = await contract.evaluateTransaction('queryProcess', pid1);
        console.log('Transaction complete.');
        console.log(`${qprocessResponse1.toString()}`);

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

        const pin1 = req.query.pin;
        const id1 = req.query.id;
        const uid1 = req.query.uid;
        const oid1 = req.query.oid;
        const type1 = req.query.type;
        const time1 = req.query.time;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Admin@org1.example.com';

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
        const createResponse2 = await contract.submitTransaction('createProcess', pin1, id1, uid1, oid1, type1, time1);
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

httpServer.listen(PORT, () => {
    console.log('Server running on port', PORT);
});

