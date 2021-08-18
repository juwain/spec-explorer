<template>
  <div class="pagination">
    <template
      v-for="(item, index) in count"
      :key="'pagination' + index"
    >
      <button
        type="button"
        v-if="index % pageSize === 0"
        :class="['pagination-button', { active: index / pageSize + 1 === currentPage }]"
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
