<template>
  <article class="card">
    <h2 class="card-title">
      <a :href="data.url" target="_blank">{{ data.title }}</a>
    </h2>
    <p>{{ data.organization }}</p>
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
}

.card-title a {
  text-decoration: none;
}
</style>
