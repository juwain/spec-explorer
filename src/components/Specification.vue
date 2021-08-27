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
import FilterTabs from './FilterTabs.vue';
import SpecificationDetails from './SpecificationDetails.vue';
import Pagination from './Pagination.vue';
import { toRefs, ref, watch, onMounted } from 'vue';
import useSpecificationData from '../composables/useSpecificationData.js';

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
    Pagination
  },
  setup (props) {
    const { id } = toRefs(props);
    const filterKey = ref('');
    const filteredDfns = ref([]);

    const {
      specification,
      specificationData,
      getSpecificationData
    } = useSpecificationData(id);

    const filtered = () => {
      let result = specificationData.value;

      if (filterKey.value.length > 0) {
        result = result.filter(item => {
          return item.type === filterKey.value;
        })
      }

      filteredDfns.value = result;
    }

    const onTabClick = (currentType) => {
      filterKey.value = currentType;
    }

    onMounted(filtered);

    watch([filterKey, specificationData], filtered)

    return {
      specification,
      specificationData,
      getSpecificationData,
      filteredDfns,
      onTabClick
    }
  },
  data() {
    return  {
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
      }, []).sort();
    },
    slicedDfns() {
      const startIndex = this.currentPage * this.pageSize - this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.filteredDfns.slice(startIndex, endIndex);
    }
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    resetCurrentPage() {
      this.setCurrentPage(1);
    }
  },
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