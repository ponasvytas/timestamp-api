// server.js
// where your node app starts

// init project
var express = require('express');
const moment = require('moment');
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

function dateEval (date){
  var re = /\W/g;
  var dateArr = date.split(re);

  if (dateArr.length === 1){
    var m = moment(date);
    if(m.isValid){
      return moment.unix(dateArr[0])  
    }
    return null;
  }
   return moment(dateArr.join("-"),["DD-MM-YYYY", "DD-MM-YY"
                              , "MM-DD-YY","MM-DD-YYYY", "YYYY-MM-DD", "YYYY-DD-MM", 
                              "DD-MMM-YYYY", "MMM-DD-YYYY", "DD-MMMM-YYYY"]); 
}

app.get('/api/timestamp/:query', function (req, res) {
  
  var date = req.params.query;
  
  var unix = null;
  var natural = null;
  
  var newDate = dateEval(date);

  if(newDate.format() !="Invalid date"){
    unix = newDate.format("X");
    natural = newDate.format("MMMM DD, YYYY");
  }

  var obj = {
      unix: unix,
      natural: natural
  }
  
  res.json(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
