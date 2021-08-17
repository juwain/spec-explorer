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
    <div class="specifications-filter">
      <filter-tabs
        :tabs="dfnsTypes"
        :onClickHandler="onTabClick"
      />
    </div>

    <specification-details
      v-for="dfn in filteredDfns"
      :key="dfn.uidrl"
      :data="dfn"
    />
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
</style>