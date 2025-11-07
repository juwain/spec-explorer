import { ref, watch, onMounted } from 'vue';

export default function useDataSlicer(data, initialPage = 1, initialPageSize = 20) {
  const currentPage = ref(initialPage);
  const pageSize = ref(initialPageSize);
  const slicedData = ref([]);

  const sliceData = () => {
    const startIndex = currentPage.value * pageSize.value - pageSize.value;
    const endIndex = startIndex + pageSize.value;

    slicedData.value = data.value.slice(startIndex, endIndex);
  }

  const sliceHandler = (page) => {
    currentPage.value = page;
  }

  const resetPagination = () => {
    sliceHandler(1);
  }

  onMounted(sliceData);

  watch([data, pageSize, currentPage], sliceData);

  return {
    slicedData,
    sliceHandler,
    resetPagination,
    pageSize,
    currentPage
  }
}
