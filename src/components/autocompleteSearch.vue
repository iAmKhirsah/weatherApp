<template>
  <v-col
    cols="12"
    sm="12"
    md="4"
    lg="4"
    :class="this.$vuetify.breakpoint.smAndDown && 'pa-0 pt-5'"
  >
    <v-autocomplete
      v-model="selected"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      placeholder="Search for a city..."
      item-text="LocalizedName"
      item-value="Key"
      return-object
      solo-inverted
      rounded
      hide-no-data
    >
    </v-autocomplete>
  </v-col>
</template>

<script>
import { utilService } from "../services/utilService";
import { weatherService } from "../services/weatherService";
export default {
  data() {
    return {
      loading: false,
      search: null,
      selected: null,
      items: [],
    };
  },
  created() {
    this.getResults = utilService.debounce(this.getResults);
  },
  methods: {
    async getResults(value) {
      this.loading = true;
      try {
        this.items = await weatherService.autocompleteSearch(value);
        this.loading = false;
      } catch (err) {
        this.$store.dispatch({
          type: "onAlert",
          category: "error",
          userMsg: err,
        });
      }
    },
  },
  watch: {
    search(val) {
      val && val !== this.selected && this.getResults(val);
    },
    selected(val) {
      val && this.$emit("selectedCity", val);
    },
  },
};
</script>
