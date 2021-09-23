// import { createStore } from 'vuex';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  key: 'spec-explorer',
  storage: window.localStorage,
});

const state = {
  favourites: []
}

const mutations = {
  addToFavourites(state, dfn) {
    state.favourites = [
      ...state.favourites,
      dfn
    ];
  },
  removeFromFavourites (state, dfn) {
    state.favourites = state.favourites.filter(({ id }) => id !== dfn.id);
  }
}

const actions = {
  addToFavourites({ commit }, dfn) {
    commit('addToFavourites', dfn);
  },
  removeFromFavourites({ commit }, dfn) {
    commit('removeFromFavourites', dfn);
  },
}

const getters = {
  isFavourited: (state) => (id) => {
    return state.favourites.some((item) => item.id === id);
  }
}

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state,
  getters,
  actions,
  mutations
});

export default store;