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

    <pagination-nav
      v-if="filteredSpecifications.length > pageSize"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :count="filteredSpecifications.length"
      :onClickHandler="setCurrentPage"
      class="specifications-pagination"
    />

    <sorting-links
      :sortings="sortings"
      :onClickHandler="onSortingClick"
      class="specifications-sorting"
    />

    <div class="specifications-grid">
      <specification-card
        v-for="specification in sortedSpecifications"
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
import Sorting from './Sorting.vue';
import SearchInput from './SearchInput.vue';
import Pagination from './Pagination.vue';
import { indexURL } from '../service/constants.js';
import { sortByAlphabet, sortByDate } from '../service/sortingFunctions.js';
import { SORT_ORDER, SORT_KEYS } from '../service/enums.js';

export default {
  name: 'Explorer',
  components: {
    'specification-card': SpecificationCard,
    'filter-tabs': FilterTabs,
    'search-input': SearchInput,
    'pagination-nav': Pagination,
    'sorting-links': Sorting
  },
  data() {
    return  {
      specificationsData: [],
      filterKey: '',
      sortingKey: '',
      sortingMode: '',
      searchQuery: '',
      pageSize: 20,
      currentPage: 1,
      sortings: {
        [SORT_KEYS.ALPHABET]: { text: 'by alphabet', fn: sortByAlphabet },
        [SORT_KEYS.DATE]: { text: 'by date', fn: sortByDate }
      }
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
    },
    slicedSpecifications() {
      const startIndex = this.currentPage * this.pageSize - this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.filteredSpecifications.slice(startIndex, endIndex);
    },
    sortedSpecifications() {
      let sorted = this.slicedSpecifications;

      if (this.sortingKey !== '') {
        sorted = sorted.sort(this.sortings[this.sortingKey].fn);

        if (this.sortingMode === SORT_ORDER.DESC) {
          sorted = sorted.reverse();
        }
      }

      return sorted;
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
    onTabClick(filter) {
      this.resetCurrentPage();
      this.filterKey = filter;
    },
    onSortingClick(sorting, mode) {
      this.resetCurrentPage();
      this.sortingKey = sorting;
      this.sortingMode = mode;
    },
    onSearchInput(query) {
      this.resetCurrentPage();
      this.searchQuery = query.toLowerCase();
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    resetCurrentPage() {
      this.setCurrentPage(1);
    },
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

.specifications-pagination {
  margin-block-end: 20px;
}

.specifications-sorting {
  margin-block-end: 20px;
}
</style>
