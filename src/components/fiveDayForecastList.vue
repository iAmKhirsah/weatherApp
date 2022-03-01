<template>
  <v-layout row wrap class="ma-0">
    <v-flex class="pa-6" xs12 md12 lg12>
      <h1>Daily Forecast</h1>
    </v-flex>
    <v-flex
      v-for="(daily, idx) in fiveDayForecast.DailyForecasts"
      :key="idx"
      wrap
      xs12
      sm6
      md4
      lg3
      xl2
    >
      <five-day-forecast-preview :daily="daily" class="mx-auto pa-1" />
    </v-flex>
  </v-layout>
</template>

<script>
import fiveDayForecastPreview from "./fiveDayForecastPreview.vue";
export default {
  components: { fiveDayForecastPreview },
  name: "fiveDayForecastList",
  props: ["fiveDayForecast"],
};
</script>