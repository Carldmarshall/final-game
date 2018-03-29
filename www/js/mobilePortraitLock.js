

function warnOnWrongOrientation(){
  // Announce the new orientation number
  setTimeout(function(){
    let orientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'
    if(orientation === 'landscape' && isPhone()){
       alert('To start, rotate your screen to portrait.');
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
warnOnWrongOrientation()