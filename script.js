// Easy floor
function fl(num) {
  return Math.floor(num);
}

// Elements
var h = {
  mainWrapper: document.querySelector('.mainWrapper'),
  mainCountdown: document.querySelector('.mainCountdown'),
  mainCountdownText: document.querySelector('.mainCountdownText'),
  currentTime: document.querySelector('.currentTime'),
  getYear: document.getElementById('getYear'),
  getMonth: document.getElementById('getMonth'),
  getDay: document.getElementById('getDay'),
  getHour: document.getElementById('getHour'),
  getMinute: document.getElementById('getMinute'),
  getSecond: document.getElementById('getSecond'),
  if24h: document.getElementById('if24h'),
  if12h: document.getElementById('if12h')
};

if (localStorage.getItem('bgColour') === null || localStorage.getItem('bgColour') == '') {
  localStorage.setItem('bgColour','white');
} else if (localStorage.getItem('bgColour') != null) {
  document.getElementById('bgColour').value = localStorage.getItem('bgColour');
}

function updateCurrentTime() {
  // new Date() is very useful
  // use new Date().getTime() to get overall milliseconds since Jan 1 1970
  var now = new Date();
  
  var extender = '';
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  
  if (if12h.checked) {
    if (hours >= 12) {
      hours -= 12;
      extender = 'PM';
    } else if (hours <= 11) {
      extender = 'AM';
    }
  } 
  
  var time = '<b>Current Time</b><br>'+hours+':'+minutes+':'+seconds+' '+extender+', '+day+'.'+(month+1)+'.'+year;
  
  var now = new Date();
  var now_millis = now.getTime();
  
  if (h.getHour.value == null || h.getHour.value == undefined) {
    h.getHour.value = 0;
  }
  
  var target = new Date(parseInt(h.getYear.value), parseInt(h.getMonth.value)-1, parseInt(h.getDay.value), parseInt(h.getHour.value), parseInt(h.getMinute.value), parseInt(h.getSecond.value));
  var target_millis = target.getTime();
  
  // Optimizing the time, e.g 5h, 46m, 3s, 123ms
  
  var countdown = target_millis-now_millis;
  var countdown_str = '';
  
  if (fl(countdown/1000/60/60/24/7) != 0) {
    countdown_str += fl(countdown/1000/60/60/24/7)+'w ';
  }
  if (fl(countdown/1000/60/60/24) != 0) {
    countdown_str += fl(fl(countdown/1000/60/60/24)-(7*fl(countdown/1000/60/60/24/7)))+'d ';
  }
  if (fl(countdown/1000/60/60) != 0) {
    countdown_str += fl(fl(countdown/1000/60/60)-(24*fl(countdown/1000/60/60/24)))+'h ';
  }
  if (fl(countdown/1000/60) != 0) {
    countdown_str += fl(fl(countdown/1000/60)-(60*fl(countdown/1000/60/60)))+'m ';
  }
  if (fl(countdown/1000) != 0){
    countdown_str += fl(fl(countdown/1000)-(60*fl(countdown/1000/60)))+'s'
  }
  
  if (target_millis < now_millis) {
    h.mainCountdownText.innerHTML = 'Done!'
  } else {
    h.mainCountdownText.innerHTML = countdown_str;
  }
  
  if (h.mainCountdownText.innerHTML == 'NaNw NaNd NaNh NaNm NaNs'){
    h.mainCountdownText.innerHTML = 'No Date Specified.'
  }
  
  localStorage.setItem('bgColour',document.getElementById('bgColour').value.toLowerCase());
  document.body.style.backgroundColor = document.getElementById('bgColour').value.toLowerCase();
  
  
  
  if (document.getElementById('bgColour').value.toLowerCase() == 'black' || document.getElementById('bgColour').value.toLowerCase() == 'rgb(0,0,0)' || document.getElementById('bgColour').value.toLowerCase() == '#ffffff') {
    h.currentTime.style.backgroundColor = 'white';
  } else {
    h.currentTime.style.backgroundColor = 'transparent';
  }
  
  h.currentTime.innerHTML = time;
}

function setDefault() {
  h.getHour.value = 0;
  h.getMinute.value = 0;
  h.getSecond.value = 0;
}

setInterval(updateCurrentTime, 1);
