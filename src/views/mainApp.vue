<template>
  <v-container
    v-if="weatherData"
    fluid
    :class="this.$vuetify.breakpoint.smAndDown ? 'pa-2' : 'pa-0'"
  >
    <v-container
      :class="[
        'd-flex',
        this.$vuetify.breakpoint.smAndDown
          ? 'flex-column-reverse pa-0'
          : 'flex-row',
      ]"
    >
      <current-weather-preview
        :weatherData="weatherData"
        @favorite="favorite"
      />
      <v-spacer></v-spacer>
      <autocomplete-search @selectedCity="selectedCity" />
    </v-container>
    <v-container
      :class="['d-flex', this.$vuetify.breakpoint.smAndDown && 'pa-0 pb-4']"
    >
      <five-day-forecast-list :fiveDayForecast="fiveDayForecast" />
    </v-container>
  </v-container>
</template>

<script>
import { weatherService } from "../services/weatherService";
import autocompleteSearch from "../components/autocompleteSearch.vue";
import fiveDayForecastList from "../components/fiveDayForecastList.vue";
import currentWeatherPreview from "../components/currentWeatherPreview.vue";
export default {
  components: {
    currentWeatherPreview,
    fiveDayForecastList,
    autocompleteSearch,
  },
  name: "mainApp",
  data() {
    return {
      localizedName: "Tel Aviv",
      id: "215854",
    };
  },
  methods: {
    selectedCity(val) {
      this.localizedName = val.LocalizedName;
      this.id = val.Key;
      this.$store.dispatch({
        type: "loadWeatherDetails",
        locationId: val.Key,
        locationName: val.LocalizedName,
      });
    },
    favorite() {
      let info = this.weatherData;
      let msg = weatherService.toggleFavorites(info.id, info.name);
      this.$nextTick(() => {
        this.$store.dispatch({ type: "loadPreferences" });
        if (msg) {
          this.$store.dispatch({
            type: "onAlert",
            category: "success",
            userMsg: `Successfully ${msg} ${info.name} from favorites`,
          });
        } else
          this.$store.dispatch({
            type: "onAlert",
            category: "success",
            userMsg: `Successfully added ${info.name} to favorites`,
          });
      });
    },
  },
  computed: {
    weatherData() {
      return this.$store.getters.weatherDetails;
    },
    fiveDayForecast() {
      return this.$store.getters.fiveDayForecast;
    },
  },
};
</script>