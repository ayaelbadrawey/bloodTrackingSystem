const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {createPool} = require('mysql');

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
    const sql = "SELECT * FROM hsopital";
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
app.listen(4000, ()=> {
    console.log("running on port 4000");
});