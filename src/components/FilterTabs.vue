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
import { ref, toRefs } from 'vue';

export default {
  name: 'FilterTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    onClickHandler: {
      type: Function,
      required: true
    },
    onBeforeClickHandler: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const { onClickHandler, onBeforeClickHandler } = toRefs(props);
    const currentTab = ref('');

    const activateFilter = (filter) => {
      currentTab.value = (currentTab.value === filter) ? '': filter;
      onBeforeClickHandler.value ? onBeforeClickHandler.value() : () => {};
      onClickHandler.value(currentTab.value);
    }

    return {
      activateFilter,
      currentTab
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
