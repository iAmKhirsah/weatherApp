// const APIKEY = "EpDtYSp4OycbAHpGAoQIT0RcXNxjWDQT"; //Backup Key
// const APIKEY = 'CGpj6MLJRXAHxHVHJf4cjdiwUiABoQds' //Backup Key
const APIKEY = "eO1qKqy4GrqS3fJ9JziYSGcws3S68VN1";
const errMsg = "Failed to get from server, please try again later";

import { storageService } from "./storageService";
export const weatherService = {
  weatherDetails,
  autocompleteSearch,
  fiveDayForecast,
  toggleFavorites,
  preferences,
  getByGeolocation,
};

async function weatherDetails(
  locationId = "215854",
  locationName = "Tel Aviv"
) {
  let cityDetails = storageService.load("cityDetails");
  if (cityDetails) {
    let search = cityDetails.find((city) => city.id === locationId);
    if (cityDetails && search) {
      return search;
    }
  }
  try {
    const res = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationId}?details=true&apikey=${APIKEY}`
    );
    let data = await res.json();
    data[0].id = locationId;
    data[0].name = locationName;
    if (cityDetails) {
      cityDetails.push(data[0]);
      storageService.save("cityDetails", cityDetails);
      return data[0];
    }
    storageService.save("cityDetails", data);
    return data[0];
  } catch (err) {
    throw new Error(errMsg);
  }
}

async function autocompleteSearch(text) {
  if (_getAutocomplete(text) && _getAutocomplete(text).length) {
    return _getAutocomplete(text);
  }
  try {
    const res = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKEY}&q=${text}`
    );
    let data = await res.json();
    _setAutocomplete(data, text);
    return _getAutocomplete(text);
  } catch (err) {
    throw new Error(errMsg);
  }
}
async function fiveDayForecast(locationId = "215854", isDaytime) {
  let fiveDayForecast = storageService.load("fiveDayForecast");
  if (fiveDayForecast) {
    let search = fiveDayForecast.find((forecast) => forecast.id === locationId);
    if (fiveDayForecast && search) {
      return search;
    }
  }
  try {
    const res = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}.json?details=true&metric=true&apikey=${APIKEY}`
    );
    let data = await res.json();
    data.id = locationId;
    data.isDaytime = isDaytime;
    if (fiveDayForecast) {
      fiveDayForecast.push(data);
      storageService.save("fiveDayForecast", fiveDayForecast);
      return data;
    } else {
      storageService.save("fiveDayForecast", [data]);
      return data;
    }
  } catch (err) {
    throw new Error(errMsg);
  }
}

function toggleFavorites(locationId, localizedName) {
  let preferences = storageService.load("preferences");
  let cityDetails = storageService.load("cityDetails");
  let idx = preferences.favorites.findIndex((fav) => fav.id === locationId);
  if (preferences && idx > -1) {
    preferences.favorites.splice(idx, 1);
    storageService.save("preferences", preferences);
    return "removed";
  }
  let cityWeatherDetails = cityDetails.find((city) => city.id === locationId);
  preferences.favorites.push({
    id: locationId,
    name: localizedName,
    cityWeatherDetails,
  });
  storageService.save("preferences", preferences);
}
function preferences(toggleDarkMode, toggleMetric) {
  let preferences = storageService.load("preferences");
  if (toggleDarkMode) {
    preferences.lightMode = !preferences.lightMode;
    storageService.save("preferences", preferences);
    return preferences;
  }
  if (toggleMetric) {
    preferences.metric = !preferences.metric;
    storageService.save("preferences", preferences);
    return preferences;
  }
  if (preferences) {
    return preferences;
  } else {
    let newPrefs = {};
    newPrefs.favorites = [];
    newPrefs.lightMode = false;
    newPrefs.metric = true;
    storageService.save("preferences", newPrefs);
    return newPrefs;
  }
}
async function getByGeolocation(lat, lon) {
  const res = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIKEY}&q=${lat}%2C${lon}&details=true`
  );
  let data = await res.json();
  let info = {
    id: data.ParentCity.Key,
    localizedName: data.ParentCity.LocalizedName,
  };
  return info;
}

function _getAutocomplete(txt) {
  let autocomplete = storageService.load("autocomplete");
  if (!autocomplete) return;
  let autocompleteRes = autocomplete.filter((ac) =>
    ac.textInput.some((text) => text.toLowerCase() === txt.toLowerCase())
  );
  return autocompleteRes;
}

function _setAutocomplete(data, txt) {
  let autocomplete = storageService.load("autocomplete");
  if (!autocomplete) {
    let incomingObj = data.map((item) => {
      return { ...item, textInput: [txt] };
    });
    storageService.save("autocomplete", incomingObj);
    return incomingObj;
  }
  let currAutocomplete = data.reduce((acc, item) => {
    autocomplete.forEach((res) => {
      if (
        res.Key === item.Key &&
        !res.textInput.some(
          (textItem) => textItem.toLowerCase() === txt.toLowerCase()
        )
      ) {
        let obj = { ...item, textInput: [...res.textInput, txt] };
        acc.push(obj);
      }
    });
    return acc;
  }, []);
  let comparison = data.reduce((acc, item) => {
    if (!currAutocomplete.some((ac) => ac.Key !== item.Key))
      acc.push({ ...item, textInput: [txt] });
    return acc;
  }, []);
  let merge = [...autocomplete, ...comparison];
  storageService.save("autocomplete", merge);
}
