// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp Microservice
app.get("/api/timestamp/:date_string?", function(req, res) {
  var unixTimeRegex = /^\d{10}$|^\d{13}$/;
  var iso8601Regex = /^\d{4}-\d\d-\d\d$/;
  
  var rawString = req.params.date_string;
  var outDate = undefined;
  var resBody = {};

  
  console.log("Input date: ", rawString);
  if ( rawString === undefined ) {
    
    console.log("No date in request, respond with current system time.");
    var outDate = new Date();
    
  } else if ( unixTimeRegex.test(rawString) ) {
    
    console.log("Input date is in Unix timestamp fromat: ", rawString);
    var outDate = new Date( parseInt(rawString) );
    
  } else if ( iso8601Regex.test(rawString) ) {
    
    console.log("Input date is in UTC ISO-8601 fromat: ", rawString);
    var outDate = new Date( rawString );

  } else {
    console.log("Invalid fromat: ", rawString);
    resBody.error = "Invalid Date";
    res.json(resBody);
  }
  
  resBody.unix = outDate.getTime();
  resBody.utc = outDate.toUTCString();
  
  console.log( "Response body: ", resBody );
  res.json(resBody);

  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
