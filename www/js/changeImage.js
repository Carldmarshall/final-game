var newsrc = "audioplay.png";

function changeImage() {
  if ( newsrc == "audioplay.png" ) {
    document.images["pic"].src = "/imgs/audioplay.png";
    document.images["pic"].alt = "Play";
    newsrc  = "audiostop.png";
  }
  else {
    document.images["pic"].src = "/imgs/audiostop.png";
    document.images["pic"].alt = "Stop";
    newsrc  = "audioplay.png";
  }
}
