<template>
  <h1>
    {{ specification.title }}
    <a
      :href="specification.url"
      target="_blank"
    >
      ↗
    </a>
  </h1>
  <div v-if="specificationData.length > 0">
    <div
      v-for="dfn in specificationData"
      :key="dfn.id"
    >
      <p>{{ dfn.id }}</p>
    </div>
  </div>
  <div v-else>
    Loading…
  </div>
</template>

<script>
import {specURL} from '../service/constants.js';

export default {
  name: 'SpecificationDetails',
  props: {
    id: SVGStringList
  },
  data() {
    return  {
      specificationData: [],
      specification: {}
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch(`${specURL}/${this.id}.json`)
        .then((response) => response.json())
        .then(({dfns, spec}) => {
          this.specification = spec;
          this.specificationData = dfns;
        });
    }
  }
}
</script>

<style scoped>
</style>