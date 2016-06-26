$(document).ready( function( event ) { 


});


$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

// Resets all values to 0
$("#reset").click( function ( event ) { 
  $("#mor-clock-in-hr").val("00");
  $("#mor-clock-in-min").val("00");
  $("#mor-clock-out-hr").val("00");
  $("#mor-clock-out-min").val("00");
  $("#aft-clock-in-hr").val("00");
  $("#aft-clock-in-min").val("00");
  $("#aft-clock-out-hr").val("00");
  $("#aft-clock-out-min").val("00");

  $("#over_time").text("0.00");
  $("#total_worked_hours").text("0.00");
  $("#afternoons-shift-result").text("0.00");
  $("#morning-shift-result").text("0.00");

  $("#mor-five-hours-warning").hide();
  $("#mor-five-hours-alert").hide();
  $("#aft-five-hours-warning").hide();
  $("#aft-five-hours-alert").hide();
});





// When user input takes
$("#mor-clock-in-hr").change( function( event ) { 
  hour_limit(this.id);
  time_calc("am", "morning-shift-result");
});

$("#mor-clock-in-min").change( function( event ) { 
  minutes_limit(this.id);
  time_calc("am", "morning-shift-result");
});

$("#mor-clock-out-hr").change( function( event ) { 
  hour_limit(this.id);
  time_calc("am", "morning-shift-result");
});

$("#mor-clock-out-min").change( function( event ) { 
  minutes_limit(this.id);
  time_calc("am", "morning-shift-result");
});


$("#aft-clock-in-hr").change( function( event ) { 
  console.log("Iam here");
  hour_limit(this.id);
  time_calc("pm", "afternoons-shift-result");
});

$("#aft-clock-in-min").change( function( event ) { 
  minutes_limit(this.id);
  time_calc("pm", "afternoons-shift-result");
});

$("#aft-clock-out-hr").change( function( event ) { 
  hour_limit(this.id);
  time_calc("pm", "afternoons-shift-result");
});

$("#aft-clock-out-min").change( function( event ) { 
  minutes_limit(this.id);
  time_calc("pm", "afternoons-shift-result");
});


// Calculates five hours limit
function five_hrs_limit ( start_time, worked_hour, time ) {
  
  var id;
  if ( worked_hour > 5 ) 
  {
    if ( time == "mor") {
      $("#mor-five-hours-warning").hide();
      $("#mor-five-hours-alert").show(1000);
    }
    else if( time == "aft") {
      $("#aft-five-hours-warning").hide();
      $("#aft-five-hours-alert").show(1000);
    }
  }
  else if ( worked_hour > 0 ) 
  {
    if ( time == "mor") {
      $("#mor-five-hours-warning").hide(500);
      $("#mor-five-hours-alert").hide(500);
    }

    else if( time == "aft") {
      $("#aft-five-hours-warning").hide(500);
      $("#aft-five-hours-alert").hide(500);
    }
  }
  else
  {
    if ( time == "mor") {
      $("#mor-five-hours-warning").show(1000);
      $("#mor-five-hours-alert").hide();
    }

    else if( time == "aft") {
      $("#aft-five-hours-warning").show(1000);
      $("#aft-five-hours-alert").hide(); 
    }
  }


  if ( time == "mor") {
    id= "#mor-five-hours-limit";
  }
  else if ( time == "aft") {
    id= "#aft-five-hours-limit";
  }
  

  if ( isNaN(start_time )){
    return;
  }

  var five_hrs_limit = 300 + Number(start_time);
  var expected_hrs = (five_hrs_limit / 60).toFixed(0);
  var expected_min = (five_hrs_limit % 60).toFixed(0);
  
  if ( expected_hrs < 10 )
    expected_hrs = "0" + expected_hrs;

  if ( expected_min < 10 )
    expected_min = "0" + expected_min;
  
  $(id).text( expected_hrs + ":" + expected_min );
  console.log( "five_hrs_limit = " + expected_hrs + ":" + expected_min);
}


// Give the limitation on minutes 
function minutes_limit ( id ) {
  if( ($( "#" + id ).val() < 0) || ($( "#" + id ).val() > 59) )
     $( "#" + id ).val("00");
}

// Give the limitation on hours
function hour_limit ( id ) {
  if( ($( "#" + id ).val() < 0) || ($( "#" + id ).val() > 24 ) )
     $( "#" + id ).val("00");
}


//calculate the time
function time_calc( time, result_id ) {

  if ( time == "am") 
    time = "mor"
  else if( time == "pm")
    time = "aft"

  var start_hr = $("#" + time + "-clock-in-hr").val();
  var start_min = $("#" + time + "-clock-in-min").val();
  var end_hr = $("#" + time + "-clock-out-hr").val();
  var end_min = $("#" + time + "-clock-out-min").val();



  //Check if input is invalid
  if( isNaN(start_hr) || isNaN(start_min) || isNaN(end_hr) || isNaN(end_min) ){
    $("#" + result_id ).text( Number(0).toFixed(2) )
    return;
  }


  //check if there is negative number
  if ( ( start_hr < 0) || ( start_min < 0) || ( end_hr < 0) || ( end_min < 0)  )
  {
    $("#" + result_id ).text( Number(0).toFixed(2) )
    return;
  }


  //convert all hours into minutes
  var start_time = ( Number(start_hr) * 60 ) + Number(start_min);
  var end_time = ( Number(end_hr) * 60 ) + Number(end_min) ;
  var worked_hour = ( end_time - start_time ) / 60;

  five_hrs_limit(start_time, worked_hour, time);
  
  //check if there is negative time
  if ( worked_hour < 0 )
  {
    $("#" + result_id ).text( Number(0).toFixed(2) )
    return;
  }

  $("#" + result_id ).text( worked_hour.toFixed(2) )


  // Calculate Total Worked Hours
  var over_time = 0;
  var total_worked_hours = 
    Number( $("#afternoons-shift-result").text()) +
    Number( $("#morning-shift-result").text());

  if ( total_worked_hours > 8 ) {
    over_time = total_worked_hours - 8;
    total_worked_hours = total_worked_hours - over_time;
  }

  $("#total_worked_hours").text( total_worked_hours.toFixed(2) );
  $("#over_time").text( over_time.toFixed(2) );

}