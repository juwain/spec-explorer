import { ref, onMounted, watch } from 'vue';

export default function useDataFilter(data, key) {
  const filterKey = ref('');
  const filteredData = ref([]);

  const filterData = () => {
    let result = data.value;

    if (filterKey.value.length > 0) {
      result = result.filter(item => {
        return item[key] === filterKey.value;
      })
    }

    filteredData.value = result;
  }

  const filterHandler = (currentType) => {
    filterKey.value = currentType;
  }

  onMounted(filterData);

  watch([filterKey, data], filterData);

  return {
    filteredData,
    filterHandler
  }
}