<template>
  <div class="filter-tabs">
    <button
      v-for="filter in data"
      :key="filter"
      @click="() => activateFilter(filter)"
      class="filter-tab"
      :class="{ active: current === filter }"
      type="button"
    >
      {{ filter }}
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
    activateFilter(filter) {
      this.current = (this.current === filter) ? '': filter;
      this.onClickHandler(this.current);
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
