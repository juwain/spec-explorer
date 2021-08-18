<template>
  <article class="spec-card">
    <h2 class="spec-card-title">
      <router-link :to="'/spec/' + data.shortname">
        {{ data.title }}
      </router-link>
    </h2>

    <p>
      <a :href="data.url" target="_blank">
        Specification ↗
      </a>
    </p>

    <p v-if="data.groups.length > 0">
      {{ data.organization }}:
      <span v-for="(item, index) in data.groups" :key="item">
        <a :href="item.url">{{ item.name }}</a>
        <span v-if="index < data.groups.length - 1"> | </span>
      </span>
    </p>

    <p>Published: {{ data.date }}</p>
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
  display: grid;
  grid-template-rows: 1fr auto 1fr auto;
  padding: 15px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow-wrap: break-word;
}

.spec-card-title a {
  text-decoration: none;
}
</style>
