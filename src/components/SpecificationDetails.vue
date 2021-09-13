<template>
  <section class="dfn">
    <h3>
      {{ data.id }}
      <a :href="data.href">↗</a>
    </h3>
    <button type="button" @click="onFavouritesClick">{{ favouritesButtonText }}</button>
    <p class="dfn-type">Type: {{ data.type }}</p>
    <p v-if="data.for.length > 0">
      For:
      <span v-for="(item, index) in data.for" :key="item">
        {{ item }}<span v-if="index < data.for.length - 1"> | </span>
      </span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'SpecificationDetails',
  props: {
    data: {
      type: Object,
      required: true
    },
    onFavouritesClick: {
      type: Function,
      required: true
    },
    favouritesButtonText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.dfn {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
}

.dfn-type {
  grid-column: 1 / -1;
}
</style>
