<template>
  <section class="dfn">
    <h3>
      {{ data.id }}
      <a :href="data.href">↗</a>
    </h3>
    <button
    class="dfn-favourite"
    type="button"
    @click="onFavouritesClick">
      <svg
        :class="['dfn-favourite-star', { active: isFavourited }]"
        viewBox="0 0 24 30"
      >
        <path d="M 18.177 22.511 C 18.178 22.511 18.178 22.511 18.179 22.511 C 18.18 22.511 18.18 22.511 18.181 22.511 Z M 17.715 22.396 L 12 19.391 L 6.285 22.4 C 5.604 22.758 4.79 22.245 4.82 21.475 C 4.822 21.432 4.827 21.389 4.834 21.346 L 5.926 14.982 L 1.3 10.471 C 0.749 9.934 0.985 9.001 1.726 8.792 C 1.768 8.78 1.811 8.771 1.854 8.765 L 8.244 7.837 L 11.1 2.047 C 11.502 1.364 12.49 1.364 12.892 2.047 L 15.75 7.837 L 22.14 8.765 C 22.902 8.876 23.258 9.769 22.781 10.374 C 22.754 10.408 22.725 10.441 22.694 10.471 L 18.07 14.978 L 19.162 21.342 C 19.267 21.952 18.798 22.51 18.179 22.511 C 18.018 22.511 17.858 22.472 17.715 22.396 Z"/>
      </svg>
      {{ isFavourited ? 'Remove from' : 'Add to'}} favourites
    </button>
    <p class="dfn-type">Type: {{ data.type }}</p>
    <p v-if="data.for.length > 0">
      For:
      <span v-for="(item, index) in data.for" :key="item">
        {{ item }}<span v-if="index < data.for.length - 1"> | </span>
      </span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'SpecificationDetails',
  props: {
    data: {
      type: Object,
      required: true
    },
    onFavouritesClick: {
      type: Function,
      required: true
    },
    isFavourited: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.dfn {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
}

.dfn-type {
  grid-column: 1 / -1;
}

.dfn-favourite {
  --border-color: #cccccc;
  border: 3px solid var(--border-color);
  outline: none;

  padding: 5px 10px;
  background-color: transparent;
  align-self: start;
  margin: 10px 10px 0 0;
  display: flex;
  gap: 5px;
  align-items: center;
}

.dfn-favourite-star {
  fill: none;
  stroke: #000000;
  stroke-width: 2px;
  width: 24px;
  height: 30px;
}

.dfn-favourite:hover,
.dfn-favourite:focus {
  --border-color: #999999;
  background-color: #f5f5f5;
}

.active {
  fill: #000000;
}
</style>
