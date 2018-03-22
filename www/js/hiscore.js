$(document).ready(function ()
 {
        $.getJSON("json/hiscore.json", function (data) {

            let arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.

           data = data.sort(function(a,b){return b.Score - a.Score}); //SCORE IN DECENDING ORDER

            $.each(data, function (index, value) {
                arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
  });

            // EXTRACT VALUE FOR TABLE HEADER.
            let col = [];
            col.push("#");
            for (let i = 0; i < arrItems.length; i++)
             {
                for (let key in arrItems[i]) 
                {
                    if (col.indexOf(key) === -1) 
                    {
                        col.push(key);

                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            let table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            let tr = table.insertRow(-1);    // we can give the value '0' also instead of -1 TABLE ROW.


            for (let i = 0; i < col.length; i++) {
                
                let th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
               
                tr.appendChild(th);


            }
              
            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (let i = 0; i < arrItems.length; i++) {

                tr = table.insertRow(-1);
               
                   let tabCell1 = tr.insertCell(-1);
                   tabCell1.innerHTML = i+1; // to start the # in the table from 1

                for (let j = 1; j < col.length; j++) {
                    
                    let tabCell = tr.insertCell(-1);
                    
                    tabCell.innerHTML = arrItems[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            let divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

        });
    });


      
