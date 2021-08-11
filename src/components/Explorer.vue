<template>
  <div v-if="specificationsData.length > 0">
    <filter-tabs
      :data="specificationsNames"
      class="specifications-filter"
    />

    <div class="specifications-grid">
      <specification-card
        v-for="specification in specificationsData"
        :key="specification.url"
        :data="specification"
      />
    </div>
  </div>
  <div v-else>
    Loading…
  </div>
</template>

<script>
import Specification from './Specification.vue';
import FilterTabs from './FilterTabs.vue';
import {specURL} from '../service/constants.js';

export default {
  name: 'Explorer',
  props: {
  },
  components: {
    'specification-card': Specification,
    'filter-tabs': FilterTabs
  },
  data() {
    return  {
      specificationsData: [],
    }
  },
  computed: {
    specificationsNames() {
      return this.specificationsData.reduce((acc, value) => {
        const organization = value.organization;

        if (!acc.includes(organization)) {
          acc.push(organization);
        }

        return acc;
      }, [])
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch(specURL)
        .then((response) => response.json())
        .then((data) => this.specificationsData = data.results);
    }
  }
}
</script>

<style scoped>
.specifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 20px;
}

.specifications-filter {
  margin-block-end: 20px;
}
</style>
