// class GameBoard {
//     constructor(selector) {
//         this.ROWS = 6;
//         this.COLS = 7;
//         this.selector = selector;
//         this.createGrid();
//         this.setupEventListners();
    
        
//     }




//     //skapar ett rutnät
//     createGrid() {
//         const $board = $(this.selector);
//         this.color = 'red';
//         for (let row = 0; row < this.ROWS; row++){
//             const $row = $('<div>')
//             .addClass('row');
//             for (let col = 0; col < this.COLS; col++){
//                 const $col = $('<div>')
//                 .addClass('col empty')
//                 //Använder .attr för att lätt kunna ge id till de olika cellerna.
//                 .attr('data-col', col)
//                 .attr('data-row', row);
//                 $row.append($col);

//             }  
//             $board.append($row);
//         }
//     }


//     setupEventListners() {
//         const $board = $(this.selector);
//         const that = this;

//         function findLastEmptyCell(col) {
//             const cells = $(`.col[data-col='${col}']`)
//             for (let i = cells.length - 1; i >= 0; i--){
//                 const $cell = $(cells[i]);
//                 if ($cell.hasClass('empty')) {
//                     return $cell;
//                 }
            
//             }
//         }

//         function markNext(col){
//             const $lastEmptyCell = findLastEmptyCell(col);
//            if ($lastEmptyCell != null){
//                 $lastEmptyCell.addClass('next-' + that.color); 
//             }
//         }

//         $board.on('mouseenter', '.col.empty', function(){
//             markNext($(this).data('col'));
//         });

//         $board.on('mouseleave', '.col', function(){
//             $('.col').removeClass('next-' + that.color);
//         });

//         $board.on('click', '.col.empty', function(){
//             const col = $(this).data('col');
//             const $lastEmptyCell = findLastEmptyCell(col);
//             $lastEmptyCell.removeClass('empty next-' + that.color);
//             if (that.color == "red"){///////////////////////
//                 that.color = "black"////////////////////////

//             }
//             else {
//                 that.color = "red";
//             }
//             //that.color = that.color == "red" ? "black" : "red";

//             $lastEmptyCell.addClass(that.color);
//             markNext(col);
//         });

//     }      
// }