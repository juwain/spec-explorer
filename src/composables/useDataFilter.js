import { ref, onMounted, watch } from 'vue';

export default function useDataFilter(data) {
  const filterKey = ref('');
  const filteredData = ref([]);

  const filterData = () => {
    let result = data.value;

    if (filterKey.value.length > 0) {
      result = result.filter(item => {
        return item.type === filterKey.value;
      })
    }

    filteredData.value = result;
  }

  const filterHandler = (currentType) => {
    filterKey.value = currentType;
  }

  onMounted(filterData);

  watch([filterKey, data], filterData)

  return {
    filteredData,
    filterHandler
  }
}