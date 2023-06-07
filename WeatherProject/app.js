const express = require("express");
const { STATUS_CODES } = require("http");
// https is a native node module
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    //https.get("https://api.openweathermap.org/data/2.5/onecall");
    res.sendFile(__dirname + "/index.html");
    
    //can only have one send instance in method call
    //res.send("Server is running.");
});

app.post("/", function(req, res){
    console.log(req.body.cityName + ", " + req.body.stateName);
    const city = req.body.cityName;
    const state = req.body.stateName;
    const apiKey = "08b66ffd1c789f71498d8d81c4f38562";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+state+",US&units=imperial&appid="+apiKey;
    https.get(url, function(response){
        console.log(express.response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(weatherDesc + " " + temp);
            //you can use multiple res.write before a send
            res.write("<h1>The temp in " + city + ", " + state + " is " + temp + " Fahrenheit</h1>")
            res.write("<h3>The weather is currently " + weatherDesc + "</h3>")
            res.write("<img src=" + imageURL + ">")
            res.send();
        });
    });
});





app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});