import { ref, watch, onMounted } from 'vue';

export default function useDataSlicer(data) {
  const currentPage = ref(1);
  const pageSize = ref(20);
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

  watch([data, currentPage], (prev, next) => {
    console.log('prev', prev);
    console.log('next', next);
    sliceData();
  });

  return {
    slicedData,
    sliceHandler,
    resetPagination,
    pageSize,
    currentPage
  }
}