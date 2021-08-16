import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerState: true,
    basemapState: "Topo",
    streamgageState: false,
    radarState: false,
    nfhlState: false,
    allRPState: false,
    fwwState: false,
    currentZoomState: 4,
  },
  mutations: {
    toggleDrawerState(state, data) {
      state.drawerState = data;
    },
    getBasemapState(state, selected) {
      state.basemapState = selected;
    },
    getStreamgageState(state, streamgagePicked) {
      state.streamgageState = streamgagePicked;
    },
    getRadarState(state, radarPicked) {
      state.radarState = radarPicked;
    },
    getNfhlState(state, nfhlPicked) {
      state.nfhlState = nfhlPicked;
    },
    getallRPState(state, allRPPicked) {
      state.allRPState = allRPPicked;
    },
    getFwwState(state, fwwPicked) {
      state.fwwState = fwwPicked;
    },
    getCurrentZoomState(state, currentZoom) {
      state.currentZoomState = currentZoom;
    },
  },
  getters: {
    drawerState: (state) => state.drawerState,
    basemapState: (state) => state.basemapState,
    streamgageState: (state) => state.streamgageState,
    radarState: (state) => state.radarState,
    nfhlState: (state) => state.nfhlState,
    allRPState: (state) => state.allRPState,
    fwwState: (state) => state.fwwState,
    currentZoomState: (state) => state.currentZoomState,
  },
  actions: {},
  modules: {},
});
