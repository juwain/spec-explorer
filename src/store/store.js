import { createStore } from 'vuex';

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

export default createStore({
  state,
  getters,
  actions,
  mutations
})