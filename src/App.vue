<template>
  <specifications-explorer class="container" />
</template>

<script>
import Explorer from './components/Explorer.vue';

export default {
  name: 'App',
  components: {
    'specifications-explorer': Explorer
  }
}
</script>

<style>
#app {
  font-family: "Avenir", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}

.container {
  max-width: 1200px;
  margin-inline: auto;
}
</style>
