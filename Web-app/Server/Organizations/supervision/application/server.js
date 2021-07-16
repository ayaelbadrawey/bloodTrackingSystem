require ('dotenv').config();

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

const Blood = require('../../bloodbank/contract/lib/blood');
const wallet = new FileSystemWallet('../identity/user/joan/wallet');


const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();
const httpServer = http.createServer(app);

const PORT = 5002 ;

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
        const userName = 'Manager@org1.example.com';

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

app.route('/query/all/bags').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Manager@org1.example.com';

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

        console.log('--------------------Query All Blood Bags--------------------');
        const qBagResponse2 = await contract.evaluateTransaction('queryAllBlood');
        console.log(`${qBagResponse2.toString()}`);
        console.log('Transaction complete.');

        const output = qBagResponse2.toString()

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
        const userName = 'Manager@org1.example.com';

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

app.route('/query/process').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {

        const pid1 = req.query.pid;

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Manager@org1.example.com';

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
        const qprocessResponse1 = await contract.evaluateTransaction('queryProcess', pid1);
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

app.route('/query/all/process').get(async(req, res, next)=>{
    const gateway = new Gateway();
    try {
        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'Manager@org1.example.com';

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

