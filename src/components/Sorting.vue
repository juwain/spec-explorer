<template>
  <div class="sortings">
    <button
      v-for="(value, name) in sortings"
      :key="name"
      @click="activateSorting(name)"
      :class="['sorting',
        { 'active': name === currentSorting },
        { 'ascending': name === currentSorting && currentMode === 'ASC' },
        { 'descending': name === currentSorting && currentMode === 'DESC' }
      ]"
      type="button"
    >
      {{ value.text }}
    </button>
  </div>
</template>

<script>
import { SORT_ORDER } from '../service/enums.js';

export default {
  name: 'Sorting',
  props: {
    sortings: Object,
    onClickHandler: Function
  },
  data() {
    return {
      currentSorting: '',
      currentMode: SORT_ORDER.ASC
    }
  },
  methods: {
    activateSorting(sorting) {
      this.currentMode === SORT_ORDER.ASC;

      if (this.currentSorting === sorting) {
        this.currentMode = (this.currentMode === SORT_ORDER.ASC) ?
          SORT_ORDER.DESC : SORT_ORDER.ASC;
      }

      this.currentSorting = sorting;

      this.onClickHandler(this.currentSorting, this.currentMode);
    }
  }
}
</script>

<style scoped>
.sortings {
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}

.sorting {
  --border-color: #cccccc;
  background-color: transparent;
  border: 3px solid var(--border-color);
  outline: none;
}

.sorting:hover:not(.active) {
  --border-color: #999999;
}

.sorting:focus-visible:not(.active) {
  --border-color: #999999;
}

.active {
  --border-color: #000000;
}

.sorting::before {
  margin-inline-end: 5px;
}

.ascending::before {
  content: "↓";
}

.descending::before {
  content: "↑";
}
</style>
