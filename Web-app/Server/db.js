const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {createPool} = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = createPool({
    host:"localhost",
    user:"root",
    password: "root12345",
    database:"info",
    connectionLimit: 10
})
app.get("/api/get", (req,res) => {
    const sql = "SELECT * FROM bloodbank WHERE bbId='BB100';";
    db.query(sql,(err, result) => {
        console.log(result);
        res.send(result);
        
    });
});
app.get("/api/get/hospitals", (req,res) => {
    const email = req.query.email;
    const sql = "SELECT * FROM info.hsopital where hEmail = '"+email+"';";
    db.query(sql,(err, result) => {
        console.log(result);
        res.send(result);   
    });
});
app.get("/api/get/bloodbank", (req,res) => {
    const email = req.query.email;
    const sql = "SELECT * FROM bloodbank WHERE bbEmail='"+email+"'";
    db.query(sql,(err, result) => {
        console.log(result);
        res.send(result);
        
    });
});
app.post("/insert/patient", (req,res) => {
    const ID = req.body.ID;
    const Email = req.body.Email;
    const sql = "INSERT INTO patient (pID, pEmail) VALUES (?,?)";;
    db.query(sql, [ID, Email], (err, result) => {
        console.log(result);
        console.log(err)
        res.send(result);
    });
});

app.get("/check/patient", (req,res) => {
    const email = req.query.email;
    const sql = "SELECT pID FROM patient WHERE pEmail='"+email+"'";
    db.query(sql,(err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/insert/donor", (req,res) => {
    const ID = req.body.ID;
    const Email = req.body.Email;
    const sql = "INSERT INTO donor (dID, dEmail) VALUES (?,?)";;
    db.query(sql, [ID, Email], (err, result) => {
        console.log(result);
        console.log(err)
        res.send(result);
    });
});

app.get("/check/donor", (req,res) => {
    const email = req.query.email;
    const sql = "SELECT dID FROM donor WHERE dEmail='"+email+"'";
    db.query(sql,(err, result) => {
        console.log(result);
        res.send(result);
    });
});
app.get("/api/write/file", (req,res) => {
    const file = req.query.file;
    const writeJsonFile = require('write-json-file');
    (async () => {
        await writeJsonFile('../../../bloodTrackingSystem-react/src/components/contents/users/ViewHospitalByBloodTypeData.json', JSON.parse(file));
    })();
    res.send('This is after the write call');
});
app.listen(5004, ()=> {
    console.log("running on port 5004");
});