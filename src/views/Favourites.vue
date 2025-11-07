<template>
  <div class="container">
    <router-link :to="{ path: '/', query: $route.query }">⬅ Back</router-link>

    <Favourites />

  </div>
</template>

<script>
import Favourites from '../components/Favourites.vue';

export default {
  name: 'Inner',
  components: {
    Favourites
  }
}
</script>
