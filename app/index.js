import document from "document";
import * as messaging from "messaging";

// Message is received from companion
messaging.peerSocket.onmessage = evt => {  
  setElement(evt.data.summary.fat, getFirstElement('fat-value'));
  setElement(evt.data.summary.carbs, getFirstElement('carb-value'));
  setElement(evt.data.summary.protein, getFirstElement('protein-value'));
  setElement(evt.data.summary.calories, getFirstElement('calories-value'));

  if (evt.data.summary.calories > evt.data.goals.calories) {
    enableStatus('red');
  }
  else {
    enableStatus('green');
  }
};

function getFirstElement(className) {
  return document.getElementsByClassName(className)[0];  
}

function setElement(value, ele) {
  ele.text = Math.ceil(value);
}

function enableStatus(fillColor) {
  setTimeout(function() {
    var status = document.getElementById('statusinstance'); 
    var statusRect = document.getElementById('status-rect'); 
    
    statusRect.style.fill = fillColor;

    status.animate('enable');
  }, 1000);
}

function disableStatus() {
  setTimeout(function() {
    var status = document.getElementById('statusinstance'); 
    status.animate('disable');
  }, 1000);
}
