<template>
  <v-app>
    <app-header
      @drawer="drawer = !drawer"
      @toggleMetric="toggleMetric"
      @darkMode="darkMode"
    ></app-header>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <div class="d-flex justify-center border-bot">
          <v-list-item class="ma-0">
            <v-tooltip v-if="!$vuetify.theme.dark" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  x-small
                  fab
                  @click="darkMode"
                  class="blue darken-3">
                  <v-icon>mdi-moon-waxing-crescent</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode On</span>
            </v-tooltip>
            <v-tooltip v-else bottom class="ma-0">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  x-small
                  fab
                  @click="darkMode"
                  class="blue darken-3">
                  <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode Off</span>
            </v-tooltip>
          </v-list-item>
          <v-list-item>
            <v-tooltip v-if="!isMetric" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  x-small
                  fab
                  @click="toggleMetric"
                  class="blue darken-3">
                  <span class="mr-1">&degC</span>
                </v-btn>
              </template>
              <span>Metric units</span>
            </v-tooltip>
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="blue darken-3"
                  x-small
                  fab
                  @click="toggleMetric">
                  <span class="mr-1">&degF</span>
                </v-btn>
              </template>
              <span>Imperial units</span>
            </v-tooltip>
          </v-list-item>
        </div>
        <v-list-item-group v-model="group" class="mt-3">
          <v-list-item>
            <router-link to="/" tag="h1">
              <h1>Home</h1>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/favorites" tag="h1">
              <h1>Favorite</h1>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <snack-bar v-if="this.$store.getters.userAlert.category" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import appHeader from "./components/appHeader.vue";
import snackBar from "./components/snackBar.vue";
import { weatherService } from "./services/weatherService";
export default {
  name: "app",
  components: {
    appHeader,
    snackBar,
  },
  data: () => ({
    gettingLocation: false,
    drawer: false,
    group: null,
  }),
  async created() {
    this.$store.dispatch({ type: "loadPreferences" });
    this.$vuetify.theme.dark = !this.$store.getters.isLightMode;
    this.getGeolocation();
  },
  methods: {
    async getGeolocation() {
      if (!("geolocation" in navigator)) {
        this.$store.dispatch({
          type: "onAlert",
          category: "warning",
          userMsg: "Geolocation is not available",
        });
        return;
      }
      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          this.gettingLocation = false;
          let location = await weatherService.getByGeolocation(
            pos.coords.latitude,
            pos.coords.longitude
          );
          this.$store.dispatch({
            type: "loadWeatherDetails",
            locationId: location.id,
            locationName: location.localizedName,
          });
        },
        (err) => {
          this.gettingLocation = false;
          this.$store.dispatch({
            type: "onAlert",
            category: "error",
            userMsg: err.message,
          });
          this.$store.dispatch({ type: "loadWeatherDetails" });
        }
      );
    },
    darkMode() {
      this.$store.dispatch({ type: "loadPreferences", darkMode: true });
      this.$nextTick(() => {
        this.$vuetify.theme.dark = !this.$store.getters.isLightMode;
        this.$store.dispatch({
          type: "onAlert",
          category: "info",
          userMsg: `Theme changed to ${
            this.$store.getters.isLightMode ? "Light mode" : "Dark mode"
          }`,
        });
      });
    },
    toggleMetric() {
      this.$store.dispatch({ type: "loadPreferences", toggleMetric: true });
      this.$nextTick(() => {
        this.$store.dispatch({
          type: "onAlert",
          category: "info",
          userMsg: `Measurement changed to ${
            this.isMetric ? "Celcius" : "Fahrenheit"
          }`,
        });
      });
    },
  },
  computed: {
    isMetric() {
      return this.$store.getters.isMetric;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
