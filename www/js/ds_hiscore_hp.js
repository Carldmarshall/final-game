$(function (){
  JSON._load("hiscore.json").then(function(data) {
    //SCORE IN DECENDING ORDER
    data = data.sort(function(a,b){return a.score - b.score});

    // display first
    $('#display').html(data[0].name + "   " +data[0].score);
  });
}); 


   

                    
                    













      
