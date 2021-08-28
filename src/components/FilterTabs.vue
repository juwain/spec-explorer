<template>
  <div class="filter-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="activateFilter(tab)"
      :class="['filter-tab', { active: tab === currentTab }]"
      type="button"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'FilterTabs',
  props: {
    tabs: Array,
    onClickHandler: Function,
    onBeforeClickHandler: Function
  },
  data() {
    return {
      currentTab: ''
    }
  },
  methods: {
    activateFilter(filter) {
      this.currentTab = (this.currentTab === filter) ? '': filter;
      this.onBeforeClickHandler();
      this.onClickHandler(this.currentTab);
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
