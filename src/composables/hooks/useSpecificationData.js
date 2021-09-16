import { ref, onMounted, watch } from 'vue';
import { specURL } from '../../service/constants.js';

export default function useSpecificationData(id) {
  let specification = ref({});
  let specificationData = ref([]);

  const getSpecificationData = async () => {
    const response = await fetch(`${specURL}/${id.value}.json`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const {dfns, spec} = await response.json();

    specification.value = spec;
    specificationData.value = dfns;
  }

  onMounted(getSpecificationData);
  watch(id, getSpecificationData);

  return {
    specification,
    specificationData,
    getSpecificationData
  }
}
