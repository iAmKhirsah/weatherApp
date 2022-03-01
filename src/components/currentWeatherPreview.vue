<template>
  <v-card max-width="500" v-if="weatherData" class="d-flex flex-column pa-2">
    <div class="d-flex align-center">
      <v-card-title
        >{{ weatherData.name }}, {{ measurement(weatherData.Temperature) }} as
        of {{ weatherData.EpochTime | time }}</v-card-title
      >
      <v-tooltip v-if="!isFavorite" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="blue darken-3" small fab @click="favorite()">
            <v-icon color="grey">mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>Favorite</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="blue darken-3" small fab @click="favorite()">
            <v-icon color="red">mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>Unfavorite</span>
      </v-tooltip>
    </div>
    <div class="d-flex">
      <div class="d-flex flex-column align-center">
        <v-img
          height="45"
          width="75"
          :src="`https://developer.accuweather.com/sites/default/files/${icons(
            weatherData.WeatherIcon
          )}`"
        ></v-img>
        <v-card-text>
          <span>{{ weatherData.WeatherText }}</span>
          <v-spacer></v-spacer>
          <span
            >{{
              measurement(
                weatherData.TemperatureSummary.Past12HourRange.Minimum
              )
            }}
            -
            {{
              measurement(
                weatherData.TemperatureSummary.Past12HourRange.Maximum
              )
            }}</span
          >
        </v-card-text>
      </div>
      <div class="d-flex flex-column mx-auto justify-end">
        <v-card-text>
          <span>Relative Humidity: {{ weatherData.RelativeHumidity }}%</span>
          <v-spacer></v-spacer>
          <span
            >Feels like: {{ measurement(weatherData.RealFeelTemperature) }},
            {{ weatherData.RealFeelTemperature.Metric.Phrase }}</span
          >
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "currentWeatherPreview",
  props: ["weatherData"],
  methods: {
    measurement(type) {
      if (this.$store.getters.isMetric)
        return type.Metric.Value.toFixed(0) + " " + "\u00B0C";
      else return type.Imperial.Value.toFixed(0) + " " + "\u00B0F";
    },
    icons(value) {
      if (value < 10) return "0" + value + "-s.png";
      else return value + "-s.png";
    },
    favorite() {
      this.$emit("favorite");
    },
  },
  computed: {
    isFavorite() {
      return this.$store.getters.favorites.find(
        (fav) => fav.id === this.weatherData.id
      );
    },
  },
};
</script>