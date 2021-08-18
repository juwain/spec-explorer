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
    <filter-tabs
      :tabs="dfnsTypes"
      :onClickHandler="onTabClick"
      class="specification-filter"
    />

    <div class="specification-dfns">
      <specification-details
        v-for="dfn in filteredDfns"
        :key="dfn.id"
        :data="dfn"
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

export default {
  name: 'Specification',
  props: {
    id: String
  },
  components: {
    'filter-tabs': FilterTabs,
    'specification-details': SpecificationDetails
  },
  data() {
    return  {
      specificationData: [],
      specification: {},
      filterKey: '',
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
    },
    onTabClick(currentType) {
      this.filterKey = currentType;
    },
  }
}
</script>

<style scoped>
.specification-filter {
  display: flex;
  flex-wrap: wrap;
}

.specification-dfns > section {
  border-bottom: 1px solid #f0f0f0;
}
</style>