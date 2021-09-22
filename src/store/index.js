import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Setting drawer state to null initially will cause sidebar
    // to be closed on mobile and open on desktop by default
    drawerState: null,
    basemapState: "Streets",
    streamgageState: false,
    radarState: false,
    nfhlState: false,
    allRPState: true,
    bankState: false,
    pathState: false,
    roadState: false,
    bridgeRiskState: false,
    bridgeState: false,
    facilityState: false,
    bfeState: false,
    otherState: false,
    fwwState: false,
    noaaState: false,
    currentZoomState: 4,
    selectedTimePeriodState: "&period=P7D",
    showAllDisabled: true,
    thresholdsExceededCount: 0,
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
    getNoaaState(state, noaaPicked) {
      state.noaaState = noaaPicked;
    },
    getBankState(state, bankPicked) {
      state.bankState = bankPicked;
    },
    getPathState(state, pathPicked) {
      state.pathState = pathPicked;
    },
    getRoadState(state, roadPicked) {
      state.roadState = roadPicked;
    },
    getBridgeRiskState(state, bridgeRiskPicked) {
      state.bridgeRiskState = bridgeRiskPicked;
    },
    getBridgeState(state, bridgePicked) {
      state.bridgeState = bridgePicked;
    },
    getFacilityState(state, facilityPicked) {
      state.facilityState = facilityPicked;
    },
    getBfeState(state, bfePicked) {
      state.bfeState = bfePicked;
    },
    getOtherState(state, otherPicked) {
      state.otherState = otherPicked;
    },
    getCurrentZoomState(state, currentZoom) {
      state.currentZoomState = currentZoom;
    },
    getSelectedTimePeriodState(state, currentTimePeriod) {
      state.selectedTimePeriodState = currentTimePeriod;
    },
    getShowAllDisabled(state, showAllDisabled) {
      state.showAllDisabled = showAllDisabled;
    },
    getThresholdsExceededCount(state, thresholdsExceededCount) {
      state.thresholdsExceededCount = thresholdsExceededCount;
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
    noaaState: (state) => state.noaaState,
    currentZoomState: (state) => state.currentZoomState,
    selectedTimePeriodState: (state) => state.selectedTimePeriodState,
    showAllDisabled: (state) => state.showAllDisabled,
    thresholdsExceededCount: (state) => state.thresholdsExceededCount,
  },
  actions: {},
  modules: {},
});
