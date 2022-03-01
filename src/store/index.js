import { weatherService } from "@/services/weatherService";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    preferences: [],
    weatherData: [],
    alert: {
      category: "",
      userMsg: "",
    },
  },
  getters: {
    isMetric({ preferences }) {
      return preferences.metric;
    },
    isLightMode({ preferences }) {
      return preferences.lightMode;
    },
    favorites({ preferences }) {
      return preferences.favorites;
    },
    weatherDetails({ weatherData }) {
      return weatherData.weatherDetails;
    },
    fiveDayForecast({ weatherData }) {
      return weatherData.fiveDayForecast;
    },
    userAlert({ alert }) {
      return alert;
    },
  },
  mutations: {
    setPreferences(state, { preferences }) {
      state.preferences = preferences;
    },
    setWeatherData(state, { weatherData }) {
      state.weatherData = weatherData;
    },
    dismissAlert(state) {
      state.alert.category = "";
      state.alert.userMsg = "";
    },
    setAlert(state, {alert}){
      state.alert = alert
    }
  },
  actions: {
    loadPreferences({ commit }, { darkMode, toggleMetric }) {
      const preferences = weatherService.preferences(darkMode, toggleMetric);
      commit({ type: "setPreferences", preferences })},

    async loadWeatherDetails({dispatch, commit }, { locationId, locationName }) {
      try {
        const weatherDetails = await weatherService.weatherDetails(locationId,locationName);
        const fiveDayForecast = await weatherService.fiveDayForecast(locationId, weatherDetails.IsDayTime);
        commit({type: "setWeatherData", weatherData: { weatherDetails, fiveDayForecast }});
      }catch(err){
        dispatch({type: 'onAlert', category: 'error', userMsg: err})
      }
    },
    dismissUserAlert({ commit }) {
      commit({ type: "dismissAlert" });
    },
    onAlert({commit},{category, userMsg}){
      commit({type: 'setAlert', alert:{category, userMsg}})
    }
  },
  modules: {},
});
