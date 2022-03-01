<template>
  <div class="snack-bar">
    <v-alert :type="userAlert.category" class="d-flex align-center"
      >{{ userAlert.userMsg }}
      <v-btn @click.prevent="dismiss" aria-label="Dismiss Alert">Dismiss</v-btn>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: "userAlert",
  created() {
    setTimeout(this.dismiss, 2000);
  },
  methods: {
    dismiss() {
      this.$store.dispatch({ type: "dismissUserAlert" });
    },
  },
  computed: {
    userAlert() {
      return this.$store.getters.userAlert;
    },
  },
};
</script>