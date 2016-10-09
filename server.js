var path = require("path");
var express = require("express");
var app = express();
var moment = require("moment");



var port = process.env.PORT || 8080



app.get('/', function(req, res) {
  var fileName = path.join(__dirname, '/index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});


// // set the view engine to ejs
// app.set('view engine', 'ejs');

// // make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/timestamp'));


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

app.get('/:query', function (req, res) {
  
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
      natural: natural, 
     
  }
  
  res.send(JSON.stringify(obj));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});