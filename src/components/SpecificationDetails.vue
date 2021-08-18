<template>
  <section>
    <h3>
      {{ data.id }}
      <a :href="data.href">↗</a>
    </h3>
    <p>Type: {{ data.type }}</p>
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
    data: Object
  }
}
</script>

<style scoped>
</style>
