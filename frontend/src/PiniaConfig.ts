import { createPinia } from 'pinia';
import { watch } from 'vue';
import { bookSeeder } from '@/stores/bookseeder.js';
import { reviewSeeder } from '@/stores/reviewseeder.js';

export default class PiniaConfig {
  private static buildInitialState() {
    return {
      book: {
        books: bookSeeder,
      },
      review: {
        reviews: reviewSeeder,
      },
    };
  }

  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      try {
        pinia.state.value = JSON.parse(savedState);
      } catch {
        // corrupted saved state: re-seed instead of crashing the app on boot
        pinia.state.value = PiniaConfig.buildInitialState();
      }
    } else {
      // initialize the state with the seeders
      pinia.state.value = PiniaConfig.buildInitialState();

      // save the initial state to localStorage
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // watch for changes and save to localStorage
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}
