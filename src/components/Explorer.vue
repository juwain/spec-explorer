<template>
  <div v-if="specificationsData.length > 0">
    <div class="specifications-filter">
      <filter-tabs
        :tabs="specificationsOrgs"
        :onClickHandler="onTabClick"
      />

      <search-input
        :onInputHandler="onSearchInput"
      />
    </div>

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
import SpecificationCard from './SpecificationCard.vue';
import FilterTabs from './FilterTabs.vue';
import SearchInput from './SearchInput.vue';
import {indexURL} from '../service/constants.js';

export default {
  name: 'Explorer',
  components: {
    'specification-card': SpecificationCard,
    'filter-tabs': FilterTabs,
    'search-input': SearchInput
  },
  data() {
    return  {
      specificationsData: [],
      filterKey: '',
      searchQuery: ''
    }
  },
  computed: {
    specificationsOrgs() {
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

      if (this.searchQuery.trim().length > 0) {
        filtered = filtered.filter((item) => {
          return item.title.toLowerCase().includes(this.searchQuery);
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
      fetch(indexURL)
        .then((response) => response.json())
        .then((data) => this.specificationsData = data.results);
    },
    onTabClick(currentOrganization) {
      this.filterKey = currentOrganization;
    },
    onSearchInput(query) {
      this.searchQuery = query.toLowerCase();
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
  display: flex;
  justify-content: space-between;
  margin-block-end: 20px;
}
</style>
