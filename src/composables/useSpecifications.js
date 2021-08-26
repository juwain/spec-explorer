import { ref, onMounted } from 'vue';
import { indexURL } from '../service/constants.js';

export default function useSpecifications() {
  let specifications = ref([]);

  const getSpecificationsData = async () => {
    const response = await fetch(indexURL);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      specifications.value = data.results;
  }

  onMounted(getSpecificationsData);

  return {
    specifications,
    getSpecificationsData
  }
}
