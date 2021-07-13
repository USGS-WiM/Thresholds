import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerState: true,
    basemapState: "Topo"
  },
  mutations: {
    toggleDrawerState (state, data) {
      state.drawerState = data
    },
    getBasemapState (state, selected){
      state.basemapState = selected
    }
  },
  getters : {
    drawerState: (state) => state.drawerState,
    basemapState: (state) => state.basemapState
  },
  actions: {
  },
  modules: {
  }
})
