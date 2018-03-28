$(document).on('click', '.video-btn', function(){
    console.log("You clicked!")
    let me  = $(this);
    let newContent = me.html().includes('.png') ?
      '<video autoplay loop class="img-fluid rules_pictures" alt="Videostop" id="vid"  src="/video/kimMovie.mov">' :
      '<img class="img-fluid rules_pictures" src="imgs/connect4.png" >';
    me.html(newContent);
});
