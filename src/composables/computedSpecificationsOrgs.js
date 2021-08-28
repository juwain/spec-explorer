import { computed } from 'vue';

export default function computedSpecificationsOrgs(specifications) {
  const specificationsOrgs = computed(() => {
    return specifications.value.reduce((acc, value) => {
      const organization = value.organization;

      if (!acc.includes(organization)) {
        acc.push(organization);
      }

      return acc;
    }, []).sort();
  })

  return {
    specificationsOrgs
  }
}