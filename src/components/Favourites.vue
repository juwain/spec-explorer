<template>
  <div v-if="favouritesData.length > 0">
    <h1>
      Favourites
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
        :onFavouritesClick="isFavourited(dfn.id) ? () => removeFromFavourites(dfn) : () => addToFavourites(dfn)"
        :isFavourited="isFavourited(dfn.id)"
        class="specification-dfn"
      />
    </div>
  </div>
  <div v-else>
    No Favourites yet…
  </div>
</template>

<script>
import FilterTabs from './FilterTabs.vue';
import SpecificationDetails from './SpecificationDetails.vue';
import Pagination from './Pagination.vue';
import SearchInput from './SearchInput.vue';
import useDataFilter from '../composables/hooks/useDataFilter.js';
import useFavourites from '../composables/hooks/useFavourites.js';
import useDataSearch from '../composables/hooks/useDataSearch.js';
import useDataSlicer from '../composables/hooks/useDataSlicer.js';
import computedSpecificationDfnTypes from '../composables/computed/computedSpecificationDfnTypes.js';

export default {
  name: 'Favourites',
  components: {
    FilterTabs,
    SpecificationDetails,
    Pagination,
    SearchInput
  },
  setup () {
    const {
      favouritesData,
      isFavourited,
      addToFavourites,
      removeFromFavourites
    } = useFavourites();

    const { dfnsTypes } = computedSpecificationDfnTypes(favouritesData);

    const {
      filteredData,
      filterHandler
    } = useDataFilter(favouritesData, 'type');

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
      favouritesData,
      dfnsTypes,
      slicedDfns: slicedData,
      onPaginationClick: sliceHandler,
      resetPagination,
      pageSize,
      currentPage,
      filteredDfns: searchedData,
      onSearchInput: searchHandler,
      onTabClick: filterHandler,
      isFavourited,
      addToFavourites,
      removeFromFavourites,
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