<template>
  <div class="filter-tabs">
    <button
      v-for="item in data"
      :key="item"
      @click="() => activateFilter(item)"
      class="filter-tab"
      :class="{ active: current === item }"
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
      current: ''
    }
  },
  methods: {
    activateFilter(item) {
      this.current = item;
      this.onClickHandler(item);
    }
  }
}
</script>

<style scoped>
.filter-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-flow: column;
  gap: 20px;
}

.filter-tab {
  --border-color: #cccccc;
  background-color: transparent;
  border: 3px solid var(--border-color);
  outline: none;
}

.filter-tab:hover {
  --border-color: #999999;
}

.filter-tab:focus-visible {
  --border-color: #999999;
}

.active {
  --border-color: #000000;
}
</style>
