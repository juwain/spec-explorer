<template>
  <div v-if="specifications.length > 0">
    <nav class="main-nav">
      <router-link to="/favourites">Favourites</router-link>
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

    const {
      filteredData,
      filterHandler
    } = useDataFilter(specifications, 'organization');

    const {
      searchedData,
      searchHandler
    } = useDataSearch(filteredData, 'title');

    const {
      sortedData,
      sortHandler
    } = useDataSorter(searchedData, sortings);

    const {
      slicedData,
      sliceHandler,
      resetPagination,
      pageSize,
      currentPage
    } = useDataSlicer(sortedData);

    return {
      specifications,
      getSpecifications,
      specificationsOrgs,
      slicedSpecifications: slicedData,
      onPaginationClick: sliceHandler,
      resetPagination,
      pageSize,
      currentPage,
      onTabClick: filterHandler,
      filteredSpecifications: searchedData,
      onSearchInput: searchHandler,
      onSortingClick: sortHandler,
      sortings
    }
  },
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
