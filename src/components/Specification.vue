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

    <FilterTabs
      :tabs="dfnsTypes"
      :onClickHandler="onTabClick"
      class="specification-filter"
    />

    <Pagination
      v-if="filteredDfns.length > pageSize"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :count="filteredDfns.length"
      :onClickHandler="setCurrentPage"
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
import {specURL} from '../service/constants.js';
import FilterTabs from './FilterTabs.vue';
import SpecificationDetails from './SpecificationDetails.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Specification',
  props: {
    id: String
  },
  components: {
    FilterTabs,
    SpecificationDetails,
    Pagination
  },
  data() {
    return  {
      specificationData: [],
      specification: {},
      filterKey: '',
      pageSize: 20,
      currentPage: 1
    }
  },
  computed: {
    dfnsTypes() {
      return this.specificationData.reduce((acc, value) => {
        const type = value.type;

        if (!acc.includes(type)) {
          acc.push(type);
        }

        return acc;
      }, [])
    },
    filteredDfns() {
      let filtered = this.specificationData;

      if (this.filterKey.length > 0) {
        filtered = this.specificationData.filter((item) => {
          return item.type === this.filterKey;
        })
      }

      return filtered;
    },
    slicedDfns() {
      const startIndex = this.currentPage * this.pageSize - this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.filteredDfns.slice(startIndex, endIndex);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await fetch(`${specURL}/${this.id}.json`);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const {dfns, spec} = await response.json();

      this.specification = spec;
      this.specificationData = dfns;
    },
    onTabClick(currentType) {
      this.resetCurrentPage();
      this.filterKey = currentType;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    resetCurrentPage() {
      this.setCurrentPage(1);
    }
  }
}
</script>

<style scoped>
.specification-filter {
  display: flex;
  flex-wrap: wrap;
  margin-block-end: 20px;
}

.specification-pagination {
  margin-block-end: 20px;
}

.specification-dfn {
  border-bottom: 1px solid #f0f0f0;
}
</style>