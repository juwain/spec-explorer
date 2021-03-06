import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default function useFavourites() {
  const store = useStore();
  const favouritesData = ref([]);
  const favouritesCount = computed(() => store.state.favourites.length);

  const getFavouritesData = () => {
    favouritesData.value = store.getters.favourites;
  }

  const isFavourited = (id) => store.getters.isFavourited(id);

  const addToFavourites = (dfn) => store.dispatch('addToFavourites', dfn);
  const removeFromFavourites = (dfn) => store.dispatch('removeFromFavourites', dfn);

  onMounted(getFavouritesData);
  watch(favouritesCount, getFavouritesData);

  return {
    favouritesData,
    addToFavourites,
    removeFromFavourites,
    isFavourited
  }
}
