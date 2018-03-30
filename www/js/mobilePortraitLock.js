

function warnOnWrongOrientation(){
  // Announce the new orientation number
  setTimeout(function(){
    let orientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'
    if(orientation === 'landscape' && isPhone()){
       $('#LongTitle').text("race4space"); 
                $('#myModal .modal-body').html(" To play we recomend that you <br> rotate your screen to portrait.👍");
                $('#myModal').modal();
    }
  }, 10);
}

function isPhone(){
  let shortestSide = Math.min(window.innerWidth, window.innerHeight);
  if(shortestSide < 400 && isTouchDevice()){
    return true;
  }
}

function isTouchDevice() {
  return !!('ontouchstart' in window);
}

window.addEventListener("orientationchange", warnOnWrongOrientation);
warnOnWrongOrientation();
