import { ref, onMounted, watch } from 'vue';
import { SORT_ORDER } from '../../service/enums.js';

export default function useDataSorter(data, sortings, initialSorting = '', initialMode = '') {
  const sortingKey = ref(initialSorting);
  const sortingMode = ref(initialMode);
  const sortedData = ref([]);

  const sortData = () => {
    let result = [...data.value];

    if (sortingKey.value !== '') {
      result = result.sort(sortings[sortingKey.value].fn);

      if (sortingMode.value === SORT_ORDER.DESC) {
        result = result.reverse();
      }
    }

    sortedData.value = result;
  }

  const sortHandler = (sorting, mode) => {
    sortingKey.value = sorting;
    sortingMode.value = mode;
  }

  onMounted(sortData);

  watch([sortingKey, sortingMode, data], sortData);

  return {
    sortingKey,
    sortingMode,
    sortedData,
    sortHandler
  }
}
