import Vue from 'vue'
import Vuex from 'vuex'
import { MdProgress } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(Vuex)
Vue.use(MdProgress)

export default new Vuex.Store({
  state: {
    drawerState: true,
    basemapState: "Topo",
    streamgageState: false,
    currentZoomState: 4
  },
  mutations: {
    toggleDrawerState (state, data) {
      state.drawerState = data
    },
    getBasemapState (state, selected){
      state.basemapState = selected
    },
    getStreamgageState (state, streamgagePicked){
      state.streamgageState = streamgagePicked
    },
    getCurrentZoomState (state, currentZoom){
      state.currentZoomState = currentZoom
    }
  },
  getters : {
    drawerState: (state) => state.drawerState,
    basemapState: (state) => state.basemapState,
    streamgageState: (state) => state.streamgageState,
    currentZoomState: (state) => state.currentZoomState
  },
  actions: {
  },
  modules: {
  }
})
