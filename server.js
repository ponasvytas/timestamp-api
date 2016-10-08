var express = require("express");
var app = express();
var moment = require("moment");

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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});