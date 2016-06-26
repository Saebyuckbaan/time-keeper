$(document).ready( function( event ) { 

  $("#mor-clock-in-hr").val("08");
  $("#mor-clock-in-min").val("59");
  $("#mor-clock-out-hr").val("12");
  $("#mor-clock-out-min").val("11");
time_calc("am", "morning-shift-result");
  

});

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



function minutes_limit ( id ) {
  if( ($( "#" + id ).val() < 0) || ($( "#" + id ).val() > 59) )
     $( "#" + id ).val("00");
}


function hour_limit ( id ) {
  if( ($( "#" + id ).val() < 0) || ($( "#" + id ).val() > 24 ) )
     $( "#" + id ).val("00");
}

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
  
  //check if there is negative time
  if ( worked_hour < 0 )
  {
    $("#" + result_id ).text( Number(0).toFixed(2) )
    return;
  }


  $("#" + result_id ).text( worked_hour.toFixed(2) )

  var total_worked_hours = 
    Number( $("#afternoons-shift-result").text()) +
    Number( $("#morning-shift-result").text());
  $("#total_worked_hours").text( total_worked_hours.toFixed(2) );

}