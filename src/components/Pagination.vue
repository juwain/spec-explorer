<template>
  <div class="pagination">
    <template
      v-for="(item, index) in count"
      :key="'pagination' + index"
    >
      <button
        type="button"
        v-if="index % pageSize === 0"
        :class="['pagination-button', { active: getNormalizedIndex(index) === currentPage }]"
        @click="paginate(index)"
      >
        {{ getNormalizedIndex(index) }}
      </button>
    </template>
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    onClickHandler: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { pageSize, onClickHandler, currentPage } = toRefs(props);

    const pageIndex = currentPage.value;

    const getNormalizedIndex = (index) => {
      return index / pageSize.value + 1;
    }

    const paginate = (index) => {
      const page = getNormalizedIndex(index);
      onClickHandler.value(page);
    }

    return {
      paginate,
      getNormalizedIndex,
      pageIndex
    }
  },
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pagination-button {
  --border-color: transparent;
  background-color: transparent;
  border: 3px solid var(--border-color);
  outline: none;
}

.pagination-button:hover:not(.active) {
  --border-color: #999999;
}

.pagination-button:focus-visible:not(.active) {
  --border-color: #999999;
}

.active {
  --border-color: #000000;
}
</style>
