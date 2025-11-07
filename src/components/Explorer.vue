<template>
  <div v-if="specifications.length > 0">
    <nav class="main-nav">
      <router-link :to="{ path: '/favourites', query: $route.query }">Favourites</router-link>
    </nav>

    <section class="specifications-filter">
      <FilterTabs
        :tabs="specificationsOrgs"
        :onBeforeClickHandler="resetPagination"
        :onClickHandler="onTabClick"
      />

      <SearchInput
        :onBeforeInputHandler="resetPagination"
        :onInputHandler="onSearchInput"
      />
    </section>

    <Pagination
      v-if="filteredSpecifications.length > pageSize"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :count="filteredSpecifications.length"
      :onClickHandler="onPaginationClick"
      class="specifications-pagination"
    />

    <Sorting
      :sortings="sortings"
      :onClickHandler="onSortingClick"
      class="specifications-sorting"
    />

    <section class="specifications-grid">
      <SpecificationCard
        v-for="specification in slicedSpecifications"
        :key="specification.url"
        :data="specification"
      />
    </section>
  </div>
  <div v-else>
    Loading…
  </div>
</template>

<script>
import { watch } from 'vue';
import SpecificationCard from './SpecificationCard.vue';
import FilterTabs from './FilterTabs.vue';
import Sorting from './Sorting.vue';
import SearchInput from './SearchInput.vue';
import Pagination from './Pagination.vue';
import { sortings } from '../service/sortings.js';
import useSpecifications from '../composables/hooks/useSpecifications.js';
import useDataFilter from '../composables/hooks/useDataFilter.js';
import useDataSearch from '../composables/hooks/useDataSearch.js';
import useDataSlicer from '../composables/hooks/useDataSlicer.js';
import useDataSorter from '../composables/hooks/useDataSorter.js';
import useURLState from '../composables/hooks/useURLState.js';
import computedSpecificationsOrgs from '../composables/computed/computedSpecificationsOrgs.js';

export default {
  name: 'Explorer',
  components: {
    SpecificationCard,
    FilterTabs,
    SearchInput,
    Pagination,
    Sorting
  },
  setup () {
    const {
      specifications,
      getSpecifications
    } = useSpecifications();

    const { specificationsOrgs } = computedSpecificationsOrgs(specifications);

    // URL state management with defaults
    const {
      filter: filterKey,
      search: searchQuery,
      sort: sortingKey,
      order: sortingMode,
      page: currentPage
    } = useURLState({
      filter: '',
      search: '',
      sort: '',
      order: '',
      page: '1'
    });

    const {
      filteredData,
      filterHandler,
      filterKey: internalFilterKey
    } = useDataFilter(specifications, 'organization', filterKey.value);

    const {
      searchedData,
      searchHandler,
      searchQuery: internalSearchQuery
    } = useDataSearch(filteredData, 'title', searchQuery.value);

    const {
      sortedData,
      sortHandler,
      sortingKey: internalSortingKey,
      sortingMode: internalSortingMode
    } = useDataSorter(searchedData, sortings, sortingKey.value, sortingMode.value);

    const {
      slicedData,
      sliceHandler,
      resetPagination,
      pageSize,
      currentPage: internalCurrentPage
    } = useDataSlicer(sortedData, parseInt(currentPage.value) || 1);

    // Keep composable states in sync with URL state
    watch(filterKey, (newValue) => {
      if (internalFilterKey.value !== newValue) {
        filterHandler(newValue);
      }
    });

    watch(searchQuery, (newValue) => {
      if (internalSearchQuery.value !== newValue) {
        searchHandler(newValue);
      }
    });

    watch([sortingKey, sortingMode], ([newSort, newOrder]) => {
      if (internalSortingKey.value !== newSort || internalSortingMode.value !== newOrder) {
        sortHandler(newSort, newOrder);
      }
    });

    watch(currentPage, (newPage) => {
      const pageNum = parseInt(newPage);
      if (internalCurrentPage.value !== pageNum) {
        sliceHandler(pageNum);
      }
    });

    // Create wrappers for handlers that update URL state
    const handleFilter = (value) => {
      filterHandler(value);
      filterKey.value = value;
      currentPage.value = '1'; // Reset page when filtering
    };

    const handleSearch = (value) => {
      searchHandler(value);
      searchQuery.value = value;
      currentPage.value = '1'; // Reset page when searching
    };

    const handleSort = (sort, mode) => {
      sortHandler(sort, mode);
      sortingKey.value = sort;
      sortingMode.value = mode;
    };

    const handlePage = (page) => {
      sliceHandler(page);
      currentPage.value = String(page);
    };

    const handleResetPagination = () => {
      resetPagination();
      currentPage.value = '1';
    };

    return {
      specifications,
      getSpecifications,
      specificationsOrgs,
      slicedSpecifications: slicedData,
      onPaginationClick: handlePage,
      resetPagination: handleResetPagination,
      pageSize,
      currentPage: internalCurrentPage,
      onTabClick: handleFilter,
      filteredSpecifications: searchedData,
      onSearchInput: handleSearch,
      onSortingClick: handleSort,
      sortings
    }
  },
}
</script>

<style scoped>
.main-nav {
  margin: 10px 0;
}

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
