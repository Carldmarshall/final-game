$(function (){
  JSON._load("hiscore.json").then(function(data) {
    //SCORE IN DECENDING ORDER
    data = data.sort(function(a,b){return b.Score - a.Score});

    // display first
    $('#display').html(data[0].Name + "   " +data[0].Score);
  });
}); 


   

                    
                    













      
