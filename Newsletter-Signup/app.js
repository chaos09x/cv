//jshint esversion: 6
// mailchimp Key 
// 0e7d507038e5b90893f93e35904a058f-us9
// list id
// 41898899ff should be correct

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const L_PORT = 3000;
// const request = require("request");
const https = require('https');
const API_KEY = "0e7d507038e5b90893f93e35904a058f-us9";
const audianceID = "41898899ff"; 
 
app.use(express.static("public"));
 
app.listen(process.env.PORT || L_PORT, (req, res) => {
    console.log("App is listening on Port : ", PORT);
})

// app.listen(process.env.PORT || port, () => console.log('Listening on port ${port}'))

//redirect to signup page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})
 
//setting bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
//signup route setting up post method and connecting to the mailchimp server
app.post('/', (req, res) => {
 
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
 
    //setting up data for mailchimp endpoint
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
 
 
    const jsonData = JSON.stringify(data);
 
    const url = `https://us9.api.mailchimp.com/3.0/lists/${audianceID}`;
    const options = {
 
        method: "POST",
        headers: {
            Authorization: `auth ${API_KEY}`
        },
 
    }
 
    //setting up response for success & failure
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            // res.send("success")
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
            // res.send("failure")
        }
 
        // getting data 
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
 
    // sinmitting data to mailchimp
    request.write(jsonData);
    request.end();
 
});
 
//redirect to the main page if failed
app.post("/failure", (req, res) => {
    res.redirect("/");
})