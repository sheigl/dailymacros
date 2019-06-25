import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Fetch Data from Fitbit Web API
function fetchData(accessToken)  {
  let date = new Date();
  let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD
  
  let netcarbs = settingsStorage.getItem("netcarbs");

  // Food API docs - https://dev.fitbit.com/build/reference/web-api/food-logging/#food-or-water-time-series
  fetch(`https://api.fitbit.com/1.2/user/-/foods/log/date/${todayDate}.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    let myData = {
      summary: data.summary,
      goals: data.goals,
      settings: {
        showNetCarbs: netcarbs
      }
    }

    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(myData);
    }
  })
  .catch(err => console.log('[FETCH]: ' + err));
}

// A user changes Settings
settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    fetchData(data.access_token) ;
  }
};

// Restore previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key && key === "oauth") {
      // We already have an oauth token
      let data = JSON.parse(settingsStorage.getItem(key))
      fetchData(data.access_token);
    }
  }
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  restoreSettings();
};
