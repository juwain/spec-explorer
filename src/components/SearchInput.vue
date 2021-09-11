<template>
  <label class="search">
    <span class="search-label">Search:</span>
    <input
      @input="activateSearch"
      class="search-input"
      type="text"
    />
  </label>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'SearchInput',
  props: {
    onInputHandler: {
      type: Function,
      required: true
    },
    onBeforeInputHandler: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const { onBeforeInputHandler, onInputHandler } = toRefs(props);

    const activateSearch = (event) => {
      onBeforeInputHandler.value ? onBeforeInputHandler.value() : () => {};
      onInputHandler.value(event.target.value);
    }

    return {
      activateSearch
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
