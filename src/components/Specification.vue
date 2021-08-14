<template>
  <article class="card">
    <h2 class="card-title">
      {{ data.title }}
    </h2>
    <p><a :href="data.url" target="_blank">{{ data.organization }} ↗</a></p>
  </article>
</template>

<script>

export default {
  name: 'Specification',
  props: {
    data: Object
  }
}
</script>

<style scoped>
.card {
  padding: 15px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow-wrap: break-word;
}

.card-title a {
  text-decoration: none;
}
</style>
