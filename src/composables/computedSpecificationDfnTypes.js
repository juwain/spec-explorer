import { computed } from 'vue';

export default function computedSpecificationDfnTypes(specificationData) {
  const dfnsTypes = computed(() => {
    return specificationData.value.reduce((acc, value) => {
      const type = value.type;

      if (!acc.includes(type)) {
        acc.push(type);
      }

      return acc;
    }, []).sort()
  })

  return {
    dfnsTypes
  }
}