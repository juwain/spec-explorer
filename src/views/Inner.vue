<template>
  <div class="container">
    <router-link to="/">⬅ Назад</router-link>

    <specification-details
      :id="$route.params.id"
    />

  </div>
</template>

<script>
import Specification from '../components/Specification.vue';

export default {
  name: 'Inner',
  components: {
    'specification-details': Specification
  }
}
</script>

