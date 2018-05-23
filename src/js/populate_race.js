// function to populate races

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// size of text for bar charts
if (screen.width < 480){
  var text_len = 185;
} else {
  var text_len = 321;
}

module.exports = {

  populateRace: function(raceID,racevar,p) {

    var count = 1; var sum = 0;
    while (racevar["c"+count]) {
      var element = +racevar["c"+count];
      sum += element;
      count++;
    }
    // this is a hack for when there are no reported results yet
    if (sum == 0) { sum = 0.1; }
    var count = 1;
    if (racevar.pt && racevar.p) {
      var html = "<div class='candidate-precincts'>"+formatthousands(racevar.p)+" / "+formatthousands(racevar.pt)+" precincts reporting</div>";
    } else {
      var html = "<div class='candidate-precincts'>"+formatthousands(racevar.p)+" / "+formatthousands(p)+" precincts reporting</div>";
    }
    while (racevar["c"+count]) {
      var namekey = racevar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
      if (racevar["c"+count+"_party"]){
        if (racevar["d"]) {
          if ((racevar["c"+count+"_name"] == racevar["d"]) && (racevar["c"+count+"_i"] == 1)) {
            html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else if (racevar["c"+count+"_name"] == racevar["d"]) {
            html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else if (racevar["c"+count+"_i"] == 1) {
            html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else {
            html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          }
        } else if (racevar["c"+count+"_i"] == 1) {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        }
      } else {
        if ((racevar["c"+count+"_d"] == 1) && (racevar["c"+count+"_i"] == 1)) {
          html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+ "<i class='fa fa-star' aria-hidden='true'></i></span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else if (racevar["c"+count+"_d"] == 1) {
          html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+ "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else if (racevar["c"+count+"_i"] == 1){
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+ "<i class='fa fa-star' aria-hidden='true'></i></span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+ "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        }
      }
      count ++;
      if (count === 4 && racevar["c4"]){
        html = html+"<div class='expand-button' id='expandbutton"+raceID.id+"'>See more</div><div class='expanded-races' id='expandsection"+raceID.id+"'>";
      }
    }
    if (count > 4){
      var closeDiv = html + "</div></div>";
    } else {
      var closeDiv = html + "</div>";
    }
    raceID.innerHTML = closeDiv;
    count = 1;
    while (racevar["c"+count]) {
      var namekey = racevar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
      if (sum == 0.1) {
        document.getElementById(String(namekey)).style.width = "0px";
      } else {
        var width = document.getElementById("bayarea").getBoundingClientRect().width-80;
        var percent = Math.round(racevar["c"+count]/sum*100);
        var pixels = (width-text_len)*(percent/100);
        document.getElementById(String(namekey)).style.width = String(pixels)+"px";
      }
      count++;
    }
    if (count > 4){
      // add event listener to expand collapsed sections
      document.getElementById("expandbutton"+raceID.id).addEventListener("click",function(){
        console.log("click");
        document.getElementById("expandsection"+raceID.id).classList.toggle("displayraces");
        if (document.getElementById("expandsection"+raceID.id).classList.contains("displayraces")){
          this.innerHTML = "See Less";
        } else {
          this.innerHTML = "See More";
        }

      });
    }


  }
}