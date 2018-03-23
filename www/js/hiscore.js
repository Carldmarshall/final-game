
$(document).ready(function ()
 {
        $.getJSON("json/hiscore.json", function (data) {

            let arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.

           data = data.sort(function(a,b){return b.score - a.score}); //SCORE IN DECENDING ORDER

            $.each(data, function (index, value) {
                arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
            });

            // Make VALUEs FOR TABLE HEADER.
            let col = ['#', 'Name', 'Score'];

            // CREATE DYNAMIC TABLE.
            let table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            let tr = table.insertRow(-1);    // we can give the value '0' also instead of -1 TABLE ROW.


            for (let i = 0; i < col.length; i++) {
                
                let th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
               
                tr.appendChild(th);


            }
              
            arrItems = arrItems.slice(0,4);
            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (let i = 0; i < arrItems.length; i++) {

                tr = table.insertRow(-1);
               
                   let tabCell1 = tr.insertCell(-1);
                   tabCell1.innerHTML = i+1; // to start the # in the table from 1

                   let tabCell2 = tr.insertCell(-1);
                   tabCell2.innerHTML = arrItems[i].name;

                   let tabCell3 = tr.insertCell(-1);
                   tabCell3.innerHTML = arrItems[i].score;
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            //let divContainer = document.getElementById("showData");
            //divContainer.innerHTML = "";
            //divContainer.appendChild(table);
    
             

            $('#showData').html(table)

            

          
        });
    });


      
