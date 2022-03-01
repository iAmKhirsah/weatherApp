<template>
  <div>
    <v-app-bar color="light-blue accent-4" dense dark>
      <v-container
        :class="[
          'd-flex align-center justify-space-between',
          this.$vuetify.breakpoint.smAndDown && 'pa-0',
        ]"
      >
        <v-toolbar-title
          ><router-link to="/" tag="span">
            <v-btn text :class="this.$vuetify.breakpoint.smAndDown && 'pa-0'">
              <span>Weather App</span>
            </v-btn>
          </router-link></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          @click.stop="drawer"
          v-if="isMobile"
        ></v-app-bar-nav-icon>
        <div class="d-flex" v-if="!isMobile">
          <router-link to="/" tag="span">
            <v-btn text>
              <span>Home</span>
            </v-btn>
          </router-link>
          <router-link to="/favorites" tag="span">
            <v-btn text>
              <span>Favorites</span>
            </v-btn>
          </router-link>
          <div class="ml-1">
            <v-tooltip v-if="!$vuetify.theme.dark" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="indigo darken-4"
                  x-small
                  fab
                  @click="darkMode">
                  <v-icon color="grey" class="mr-1">mdi-moon-waxing-crescent</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode On</span>
            </v-tooltip>
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="blue darken-3"
                  x-small
                  fab
                  @click="darkMode">
                  <v-icon color="yellow" class="mt-1">mdi-white-balance-sunny</v-icon>
                </v-btn>
              </template>
              <span>Dark Mode Off</span>
            </v-tooltip>
          </div>
          <div class="ml-3">
            <v-tooltip v-if="!isMetric" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="indigo darken-4"
                  x-small
                  fab
                  @click="toggleMetric"
                >
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
                  @click="toggleMetric"
                >
                  <span class="mr-1">&degF</span>
                </v-btn>
              </template>
              <span>Imperial units</span>
            </v-tooltip>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "appHeader",
  methods: {
    darkMode() {
      this.$emit("darkMode");
    },
    toggleMetric() {
      this.$emit("toggleMetric");
    },
    drawer() {
      this.$emit("drawer");
    },
  },
  computed: {
    isMetric() {
      return this.$store.getters.isMetric;
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>