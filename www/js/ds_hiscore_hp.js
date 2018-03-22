
     
        $(document).ready(function ()
        {
        $.getJSON("json/hiscore.json", function (data) 
        {

           let arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.

           data = data.sort(function(a,b){return b.Score - a.Score}); //SCORE IN DECENDING ORDER

            $.each(data, function (index, value)
             {
                arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
             });

          //document.getElementById("dis1").innerHTML = JSON.stringify(arrItems[0]);
			$('#display').html(arrItems[0].Name + " " + " " + " " +arrItems[0].Score);

          
          

             


        });
    }); 


   

                    
                    













      
