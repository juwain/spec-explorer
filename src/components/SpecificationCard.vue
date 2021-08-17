<template>
  <article class="spec-card">
    <h2 class="spec-card-title">
      <a
        :href="data.shortname"
        @click.prevent="navigateToSpec(data.shortname)"
      >
        {{ data.title }}
      </a>
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
    data: Object,
    onClickHandler: Function
  },
  methods: {
    navigateToSpec(spec) {
      this.onClickHandler(spec);
    }
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
