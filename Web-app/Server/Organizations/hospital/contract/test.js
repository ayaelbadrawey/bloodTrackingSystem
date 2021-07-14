var xlsx = require ("xlsx");
var wb = xlsx.readFile("InitialData.xlsx", {cellDates:true});


var ws_blood = wb.Sheets["Blood"];
var blood = xlsx.utils.sheet_to_json(ws_blood, {raw:false});
console.log("---------------Blood---------------");
console.log(blood[0].donorID);
console.log("-----------------------------------");
/*

var ws_don = wb.Sheets["Donation"];
var donation = xlsx.utils.sheet_to_json(ws_don, {raw:false});
console.log("-------------donation--------------");
console.log(donation[0]);
console.log("-----------------------------------");


var ws_tran = wb.Sheets["Under_Transportation"];
var tran = xlsx.utils.sheet_to_json(ws_tran, {raw:false});
console.log("-----------transportaion-----------");
console.log(tran[0]);
console.log("-----------------------------------");


var ws_del = wb.Sheets["DELIEVERED"];
var del = xlsx.utils.sheet_to_json(ws_del, {raw:false});
console.log("-------------delivered-------------");
console.log(del[0]);
console.log("-----------------------------------");


var ws_used = wb.Sheets["USED"];
var used = xlsx.utils.sheet_to_json(ws_used, {raw:false});
console.log("----------------used---------------");
console.log(used[0]);
console.log("-----------------------------------");


var ws_recieve = wb.Sheets["Recieve"];
var recieve = xlsx.utils.sheet_to_json(ws_recieve, {raw:false});
console.log("--------------recieve--------------");
console.log(recieve[0]);
console.log("-----------------------------------");


*/