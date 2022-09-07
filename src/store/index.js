import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Setting drawer state to null initially will cause sidebar
    // to be closed on mobile and open on desktop by default
    spanishState: false,
    drawerState: null,
    basemapState: "Streets",
    streamgageState: false,
    radarState: true,
    nfhlState: false,
    allRPState: true,
    bankState: false,
    bankDisabled: true,
    pathState: false,
    pathDisabled: true,
    roadState: false,
    roadDisabled: true,
    bridgeRiskState: false,
    bridgeRiskDisabled: true,
    bridgeState: false,
    bridgeDisabled: true,
    facilityState: false,
    facilityDisabled: true,
    bfeState: false,
    bfeDisabled: true,
    otherState: false,
    otherDisabled: true,
    fwwState: false,
    noaaState: false,
    currentZoomState: 4,
    selectedTimePeriodState: "&period=P7D",
    showAllDisabled: true,
    thresholdsExceededCount: 0,
    rtOpacity: 1,
    allFeaturesOpacity: 1,
    noaaOpacity: 1,
    nfhlOpacity: 1,
    nwsOpacity: 1,
    fwwOpacity: 1,
  },
  mutations: {
    getEnglishState(state, englishState) {
      state.englishState = englishState;
    },
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
    getBankDisabledState(state, bankDisabled) {
      state.bankDisabled = bankDisabled;
    },
    getPathState(state, pathPicked) {
      state.pathState = pathPicked;
    },
    getPathDisabledState(state, pathDisabled) {
      state.pathDisabled = pathDisabled;
    },
    getRoadState(state, roadPicked) {
      state.roadState = roadPicked;
    },
    getRoadDisabledState(state, roadDisabled) {
      state.roadDisabled = roadDisabled;
    },
    getBridgeRiskState(state, bridgeRiskPicked) {
      state.bridgeRiskState = bridgeRiskPicked;
    },
    getBridgeRiskDisabledState(state, bridgeRiskDisabled) {
      state.bridgeRiskDisabled = bridgeRiskDisabled;
    },
    getBridgeState(state, bridgePicked) {
      state.bridgeState = bridgePicked;
    },
    getBridgeDisabledState(state, bridgeDisabled) {
      state.bridgeDisabled = bridgeDisabled;
    },
    getFacilityState(state, facilityPicked) {
      state.facilityState = facilityPicked;
    },
    getFacilityDisabledState(state, facilityDisabled) {
      state.facilityDisabled = facilityDisabled;
    },
    getBfeState(state, bfePicked) {
      state.bfeState = bfePicked;
    },
    getBfeDisabledState(state, bfeDisabled) {
      state.bfeDisabled = bfeDisabled;
    },
    getOtherState(state, otherPicked) {
      state.otherState = otherPicked;
    },
    getOtherDisabledState(state, otherDisabled) {
      state.otherDisabled = otherDisabled;
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
    getRtOpacity(state, rtOpacity) {
      state.rtOpacity = rtOpacity;
    },
    getAllFeaturesOpacity(state, allFeaturesOpacity) {
      state.allFeaturesOpacity = allFeaturesOpacity;
    },
    getnoaaOpacity(state, noaaOpacity) {
      state.noaaOpacity = noaaOpacity;
    },
    getnfhlOpacity(state, nfhlOpacity) {
      state.nfhlOpacity = nfhlOpacity;
    },
    getnwsOpacity(state, nwsOpacity) {
      state.nwsOpacity = nwsOpacity;
    },
    getfwwOpacity(state, fwwOpacity) {
      state.fwwOpacity = fwwOpacity;
    },
    getSpanishState(state, spanishState) {
      state.spanishState = spanishState;
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
    spanishState: (state) => state.spanishState,
  },
  actions: {},
  modules: {},
});
