<template>
  <v-container :class="this.$vuetify.breakpoint.smAndDown && 'pa-0 pb-4'">
    <v-card height="400">
      <v-layout row wrap class="ma-auto">
        <v-flex xs12 md12 lg12>
          <v-card-title>{{ daily.EpochDate | time }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="ma-0 pa-0">
              <div>High: {{ dailyMeasurement(daily.Temperature.Maximum) }}</div>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <div>Low: {{ dailyMeasurement(daily.Temperature.Minimum) }}</div>
            </v-row>
          </v-card-text>
        </v-flex>
        <v-flex xs6 md6 lg6>
          <v-card-text class="d-flex align-center flex-column">
            <v-row align="center" class="ma-0 pb-6"> Day </v-row>
            <v-img
              height="45"
              width="75"
              :src="`https://developer.accuweather.com/sites/default/files/${icons(
                this.daily.Day.Icon
              )}`"
            ></v-img>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="ma-0 pa-0">
              {{ this.daily.Day.ShortPhrase }}
            </v-row>
            <v-row align="center" class="ma-0 pa-0">{{
              this.daily.Day.RainProbability | probability
            }}</v-row>
          </v-card-text>
        </v-flex>
        <v-flex xs6 md6 lg6>
          <v-card-text class="d-flex align-center flex-column">
            <v-row align="center" class="ma-0 pb-6"> Night </v-row>
            <v-img
              height="45"
              width="75"
              :src="`https://developer.accuweather.com/sites/default/files/${icons(
                this.daily.Night.Icon
              )}`"
            ></v-img>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="ma-0 pa-0">
              {{ this.daily.Night.ShortPhrase }}
            </v-row>
            <v-row align="center" class="ma-0 pa-0">{{
              this.daily.Night.RainProbability | probability
            }}</v-row>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "fiveDayForecastPreview",
  props: ["daily"],
  methods: {
    dailyMeasurement(type) {
      if (this.$store.getters.isMetric) {
        return type.Value.toFixed(0) + " " + "\u00B0C";
      } else return ((type.Value * 9) / 5 + 32).toFixed(0) + " " + "\u00B0F";
    },
    icons(value) {
      if (value < 10) return "0" + value + "-s.png";
      else return value + "-s.png";
    },
  },
};
</script>
