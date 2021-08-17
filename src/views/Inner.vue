<template>
  <div class="about">
    <router-link to="/">⬅ Назад</router-link>

    <specification-details
      :id="$route.params.id"
    />

  </div>
</template>

<script>
import SpecificationDetails from '../components/SpecificationDetails.vue';

export default {
  name: 'Inner',
  components: {
    'specification-details': SpecificationDetails
  }
}
</script>

