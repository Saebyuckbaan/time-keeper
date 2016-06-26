var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log( req.query );
  console.log( req.query['clock-in'].substring( 0, 2 ) );

  // Calculate Clock in and out time
  var clock_in = ( Number(req.query['clock-in'].substring( 0, 2 ) ) * 60 )
                  + ( Number( req.query['clock-in'].substring( 2, 2 ) ) );


  var clock_out = ( Number(req.query['clock-out'].substring( 0, 2 ) ) * 60 )
                  + ( Number( req.query['clock-out'].substring( 2, 2 ) ) );


  var lunch_start = ( Number(req.query['lunch-start'].substring( 0, 2 ) ) * 60 )
                  + ( Number( req.query['lunch-start'].substring( 2, 2 ) ) );

  var lunch_end = ( Number(req.query['lunch-end'].substring( 0, 2 ) ) * 60 )
                  + ( Number( req.query['lunch-end'].substring( 2, 2 ) ) );

  var worked_minutes = ( lunch_start - clock_in ) + ( clock_out - lunch_end );
  var worked_hours = worked_minutes / 60;
  var worked_minutes = worked_minutes % 60;


  //Make worked hours and minutes beautiful
  if ( worked_hours < 10 )
    worked_hours = "0" + worked_hours;

  if ( worked_minutes < 10 )
    worked_minutes = "0" + worked_minutes;

  var result =  { result: "worked hour is : " + worked_hours + " hours " + worked_minutes + " minutes" };
  console.log( result );
  //res.json( result );
  res.render("index", result);
});

module.exports = router;
