<template>
  <v-card
    v-if="favorite.cityWeatherDetails"
    @click="setNewDetails"
    :width="width"
    class="pa-2"
  >
    <v-layout row>
      <v-flex xs10 md10 lg10>
        <v-card-title>
          {{ favorite.id }} | {{ favorite.name }},
          {{ measurement(favorite.cityWeatherDetails.Temperature) }},
          {{ favorite.cityWeatherDetails.WeatherText }} as of
          {{ favorite.cityWeatherDetails.EpochTime | time }}
        </v-card-title>
      </v-flex>
      <v-flex class="d-flex align-center justify-sm-end pa-3">
        <v-tooltip v-if="!isFavorite" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="favoriteToggle()">
              <v-icon color="grey">mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Favorite</span>
        </v-tooltip>
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="favoriteToggle()">
              <v-icon color="purple">mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Unfavorite</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "favoritePreview",
  props: ["favorite"],
  data() {
    return {
      isFavorite: true,
    };
  },
  methods: {
    measurement(type) {
      if (this.$store.getters.isMetric)
        return type.Metric.Value.toFixed(0) + " " + "\u00B0C";
      else return type.Imperial.Value.toFixed(0) + " " + "F";
    },
    icons(value) {
      if (value < 10) return "0" + value + "-s.png";
      else return value + "-s.png";
    },
    favoriteToggle() {
      this.$emit("favoriteToggle", this.favorite.id, this.favorite.name);
    },
    setNewDetails() {
      this.$emit("setNewDetails", this.favorite.id);
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 100 + "%";
        case "sm":
          return 600;
        case "md":
          return 700;
        case "lg":
          return 700;
        case "xl":
          return 700;
      }
    },
  },
};
</script>