import { ref, onMounted, watch } from 'vue';

export default function useDataSearch(data, key) {
  const searchQuery = ref('');
  const searchedData = ref([]);

  const searchData = () => {
    let result = data.value;

    if (searchQuery.value.length > 0) {
      result = result.filter(item => {
        return item[key].toLowerCase().includes(searchQuery.value);
      })
    }

    searchedData.value = result;
  }

  const searchHandler = (query) => {
    searchQuery.value = query.toLowerCase();
  }

  onMounted(searchData);

  watch([searchQuery, data], searchData);

  return {
    searchedData,
    searchHandler
  }
}