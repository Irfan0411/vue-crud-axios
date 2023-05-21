<template>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    name: "App",
    components: { RouterView },
    mounted() {
      this.$store.dispatch('getData')
    }
}
</script> 