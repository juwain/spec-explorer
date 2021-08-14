<template>
  <label class="search">
    <span class="search-label">Поиск:</span>
    <input
      @input="activateSearch"
      class="search-input"
      type="text"
    />
  </label>
</template>

<script>

export default {
  name: 'SearchInput',
  props: {
    onInputHandler: Function
  },
  methods: {
    activateSearch(event) {
      this.onInputHandler(event.target.value);
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  gap: 5px;
}

.search-label {

}

.search-input {
  --border-color: #cccccc;
  border: 3px solid var(--border-color);
  outline: none;
}

.search-input:focus-visible {
  --border-color: #999999;
}
</style>
