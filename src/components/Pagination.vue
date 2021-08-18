<template>
  <div class="pagination">
    <template
      v-for="(item, index) in count"
      :key="'pagination' + index"
    >
      <button
        type="button"
        v-if="index % pageSize === 0"
        :class="[{ active: index / pageSize + 1 === currentPage }]"
        @click="paginate(index / pageSize + 1)"
      >
        {{ index / pageSize + 1 }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: Number,
    currentPage: Number,
    count: Number,
    onClickHandler: Function
  },
  data() {
    return {
      pageIndex: this.currentPage
    }
  },
  methods: {
    paginate(page) {
      this.onClickHandler(page);
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pagination button:not(.active) {
  background-color: transparent;
  border: none;
}
</style>
