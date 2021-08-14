<template>
  <div v-if="specificationsData.length > 0">
    <filter-tabs
      :data="specificationsNames"
      :onClickHandler="onTabClick"
      class="specifications-filter"
    />

    <div class="specifications-grid">
      <specification-card
        v-for="specification in filteredSpecifications"
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
      filterKey: ''
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
    },
    filteredSpecifications() {
      let filtered = this.specificationsData;

      if (this.filterKey.length > 0) {
        filtered = this.specificationsData.filter((item) => {
          return item.organization === this.filterKey;
        })
      }

      return filtered;
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
    },
    onTabClick(currentOrganization) {
      this.filterKey = currentOrganization;
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
