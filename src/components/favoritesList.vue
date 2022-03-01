<template>
  <div class="d-flex flex-column align-center mt-10">
    <div v-for="favorite in favorites" :key="favorite.id">
      <favorite-preview
        :favorite="favorite"
        @favoriteToggle="favoriteToggle"
        @setNewDetails="setNewDetails"
        class="mb-2"
      />
    </div>
  </div>
</template>

<script>
import favoritePreview from "./favoritePreview.vue";
export default {
  components: { favoritePreview },
  name: "favoritesList",
  props: ["favorites"],
  methods: {
    favoriteToggle(id, name) {
      this.$emit("favoriteToggle", id, name);
    },
    setNewDetails(id) {
      this.$emit("setNewDetails", id);
    },
  },
};
</script>