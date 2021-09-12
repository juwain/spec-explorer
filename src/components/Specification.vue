<template>
  <div v-if="specificationData.length > 0">
    <h1>
      {{ specification.title }}
      <a
        :href="specification.url"
        target="_blank"
      >
        ↗
      </a>
    </h1>

    <div class="specification-filters">
      <FilterTabs
        :tabs="dfnsTypes"
        :onBeforeClickHandler="resetPagination"
        :onClickHandler="onTabClick"
        class="specification-filter"
      />

      <SearchInput
        :onBeforeInputHandler="resetPagination"
        :onInputHandler="onSearchInput"
      />
    </div>


    <Pagination
      v-if="filteredDfns.length > pageSize"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :count="filteredDfns.length"
      :onClickHandler="onPaginationClick"
      class="specification-pagination"
    />

    <div class="specification-dfns">
      <SpecificationDetails
        v-for="dfn in slicedDfns"
        :key="dfn.id"
        :data="dfn"
        class="specification-dfn"
      />
    </div>
  </div>
  <div v-else>
    Loading…
  </div>
</template>

<script>
import FilterTabs from './FilterTabs.vue';
import SpecificationDetails from './SpecificationDetails.vue';
import Pagination from './Pagination.vue';
import SearchInput from './SearchInput.vue';
import { toRefs } from 'vue';
import useSpecificationData from '../composables/useSpecificationData.js';
import useDataFilter from '../composables/useDataFilter.js';
import useDataSearch from '../composables/useDataSearch.js';
import useDataSlicer from '../composables/useDataSlicer.js';
import computedSpecificationDfnTypes from '../composables/computedSpecificationDfnTypes.js';

export default {
  name: 'Specification',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    FilterTabs,
    SpecificationDetails,
    Pagination,
    SearchInput
  },
  setup (props) {
    const { id } = toRefs(props);

    const {
      specification,
      specificationData,
      getSpecificationData
    } = useSpecificationData(id);

    const { dfnsTypes } = computedSpecificationDfnTypes(specificationData);

    const {
      filteredData,
      filterHandler
    } = useDataFilter(specificationData, 'type');

    const {
      searchedData,
      searchHandler
    } = useDataSearch(filteredData, 'id');

    const {
      slicedData,
      sliceHandler,
      resetPagination,
      pageSize,
      currentPage
    } = useDataSlicer(searchedData);

    return {
      specification,
      specificationData,
      getSpecificationData,
      dfnsTypes,
      slicedDfns: slicedData,
      onPaginationClick: sliceHandler,
      resetPagination,
      pageSize,
      currentPage,
      filteredDfns: searchedData,
      onSearchInput: searchHandler,
      onTabClick: filterHandler,
    }
  }
}
</script>

<style scoped>
.specification-filters {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-block-end: 20px;
}

.specification-filter {
  display: flex;
  flex-wrap: wrap;
}

.specification-pagination {
  margin-block-end: 20px;
}

.specification-dfn {
  border-bottom: 1px solid #f0f0f0;
}
</style>