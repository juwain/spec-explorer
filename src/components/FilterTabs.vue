<template>
  <div class="filter-tabs">
    <button
      class="filter-tab"
      type="button"
      v-for="item in data"
      :key="item">
      {{ item }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'FilterTabs',
  props: {
    data: [],
    className: String
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

}
</style>
