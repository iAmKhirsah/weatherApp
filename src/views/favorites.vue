<template>
  <v-container>
    <favorites-list
      :favorites="getFavorites"
      @favoriteToggle="favoriteToggle"
      @setNewDetails="setNewDetails"
    />
  </v-container>
</template>

<script>
import { weatherService } from "../services/weatherService";
import favoritesList from "../components/favoritesList.vue";
export default {
  components: { favoritesList },
  name: "favorites",
  methods: {
    favoriteToggle(id, name) {
      weatherService.toggleFavorites(id, name);
      this.$nextTick(() => {
        this.$store.dispatch({ type: "loadPreferences" });
      });
    },
    setNewDetails(id) {
      this.$store.dispatch({ type: "loadWeatherDetails", locationId: id });
      this.$nextTick(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    getFavorites() {
      return this.$store.getters.favorites;
    },
  },
};
</script>