<template>
  <article class="spec-card">
    <h2 class="spec-card-title">
      <router-link :to="'/spec/' + data.shortname">
        {{ data.title }}
      </router-link>
    </h2>
    <p>
      <a
        :href="data.url"
        target="_blank"
      >
        {{ data.organization }} ↗
      </a>
    </p>
  </article>
</template>

<script>

export default {
  name: 'SpecificationCard',
  props: {
    data: Object
  }
}
</script>

<style scoped>
.spec-card {
  padding: 15px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow-wrap: break-word;
}

.spec-card-title a {
  text-decoration: none;
}
</style>
