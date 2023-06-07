//jshint eversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); // allows the posting of nested objects

app.get("/", function(request, response){
    //console.log(request);
    response.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    var total = Number(req.body.num1) + Number(req.body.num2);
    res.send("Results: " + total)
});

app.get("/bmicalculator", function(request, response){
    //console.log(request);
    response.sendFile(__dirname + "/bmicalculator.html");
});
app.post("/bmicalculator", function(req, res){
    var wt = parseFloat(req.body.wt);
    var ht = parseFloat(req.body.ht);
    var total = (wt / (ht * ht)) * 10000;
    res.send("BMI: " + total.toFixed(2));
});

//you can shorthand request and response
app.get("/contact", function(req, res){
    //console.log(req);
    res.send("Contact me at cdubstester@gmail.com");
});
app.get("/about", function(req, res){
    //console.log(req);
    res.send("I enjoy stuff and things. I made this.");
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});