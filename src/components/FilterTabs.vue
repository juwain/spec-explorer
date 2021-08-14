<template>
  <div class="filter-tabs">
    <button
      v-for="item in data"
      :key="item"
      @click="() => activateFilter(item)"
      class="filter-tab"
      :class="{ active: filter === item }"
      type="button"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'FilterTabs',
  props: {
    data: [],
    onClickHandler: Function
  },
  data() {
    return {
      filter: ''
    }
  },
  methods: {
    activateFilter(current) {
      this.filter = (this.filter === current) ? '': current;
      this.onClickHandler(this.filter);
    }
  }
}
</script>

<style scoped>
.filter-tabs {
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}

.filter-tab {
  --border-color: #cccccc;
  background-color: transparent;
  border: 3px solid var(--border-color);
  outline: none;
}

.filter-tab:hover:not(.active) {
  --border-color: #999999;
}

.filter-tab:focus-visible:not(.active) {
  --border-color: #999999;
}

.active {
  --border-color: #000000;
}
</style>
