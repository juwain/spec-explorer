import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function useURLState(defaultValues = {}) {
  const route = useRoute();
  const router = useRouter();
  let isUpdatingFromURL = false;

  // Create reactive refs for each URL parameter
  const state = {};

  // Initialize state from URL query params or defaults
  Object.keys(defaultValues).forEach(key => {
    const queryValue = route.query[key];
    state[key] = ref(queryValue !== undefined ? queryValue : defaultValues[key]);
  });

  // Update URL when state changes
  const updateURL = () => {
    // Prevent URL updates if we're currently updating state from URL
    if (isUpdatingFromURL) return;

    const query = { ...route.query };

    // Update query with current state values
    Object.keys(state).forEach(key => {
      const value = state[key].value;

      if (value === defaultValues[key] || value === '' || value === null || value === undefined) {
        // Remove parameter if it's the default value or empty
        delete query[key];
      } else {
        // Set or update parameter
        query[key] = String(value);
      }
    });

    // Navigate with new query parameters
    router.replace({
      query
    });
  };

  // Watch for state changes and update URL
  Object.keys(state).forEach(key => {
    watch(state[key], () => {
      nextTick(updateURL);
    });
  });

  // Update state when URL changes (e.g., browser back/forward)
  const updateFromURL = () => {
    isUpdatingFromURL = true;

    Object.keys(state).forEach(key => {
      const queryValue = route.query[key];
      state[key].value = queryValue !== undefined ? queryValue : defaultValues[key];
    });

    nextTick(() => {
      isUpdatingFromURL = false;
    });
  };

  // Watch for route changes
  watch(() => route.query, updateFromURL, { deep: true });

  // Initialize from URL on mount
  onMounted(updateFromURL);

  return state;
}
