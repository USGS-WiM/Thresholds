<template>
  <div>
    <v-alert
      v-if="isFlooding"
      class="threshold-alert"
      border="left"
      dense
      colored-border
      type="warning"
      elevation="2"
      icon="mdi-alert"
    >
      {{ thresholdsExceededMessage }} Flooded Features
    </v-alert>
    <v-alert
      v-if="!isFlooding"
      class="noflooding-alert"
      border="left"
      dense
      colored-border
      type="success"
      elevation="2"
      icon="mdi-checkbox-marked-circle"
    >
      {{ this.noFloodingAlert() }}
    </v-alert>
    <v-expansion-panels :value="1">
      <!-- Filters Section -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ this.basemaps() }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="px-0" fluid>
            <v-btn-toggle borderless>
              <v-btn
                text
                id="streets"
                class="basemapBtn"
                value="Streets"
                @click="selected = 'Streets'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/streets.jpg"
                /><label for="streets">{{ this.streets() }}</label>
              </v-btn>
              <v-btn
                text
                id="satellite"
                class="basemapBtn"
                value="Satellite"
                @click="selected = 'Satellite'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/satellite.jpg"
                /><label for="satellite">{{ this.satellite() }}</label>
              </v-btn>
              <v-btn
                text
                id="topo"
                class="basemapBtn"
                value="Topo"
                @click="selected = 'Topo'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/topo.jpg"
                /><label for="topo">{{ this.topo() }}</label>
              </v-btn>
              <v-btn
                text
                id="terrain"
                class="basemapBtn"
                value="Terrain"
                @click="selected = 'Terrain'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/terrain.jpg"
                /><label for="terrain">{{ this.terrain() }}</label>
              </v-btn>
              <v-btn
                text
                id="gray"
                class="basemapBtn"
                value="Gray"
                @click="selected = 'Gray'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/gray.jpg"
                /><label for="gray">{{ this.gray() }}</label>
              </v-btn>
              <v-btn
                text
                id="natgeo"
                class="basemapBtn"
                value="NatGeo"
                @click="selected = 'NatGeo'"
              >
                <img
                  class="basemapThumb"
                  alt=""
                  src="../assets/natgeo.jpg"
                />NatGeo<label for="natgeo"></label>
              </v-btn>
            </v-btn-toggle>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ this.layers() }}
        </v-expansion-panel-header>
        <v-expansion-panel-content id="siteLayersContent">
          <v-container class="px-0" fluid>
            <div class="subsection-title" id="site-layer-title">
              {{ this.siteLayers() }}<br />
            </div>
            <div id="timePeriod"><DatePicker></DatePicker></div>
            <div id="activeLayerTitle">{{ this.activeLayers() }}</div>
            <div style="display: none" id="noActiveFlooding">
              {{ this.noActiveFlooding() }}
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    color="blue lighten-1"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>{{ this.noActiveFloodingTooltip() }}</span>
              </v-tooltip>
            </div>
            <div id="activeSublayers">
              <div id="bankDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="bank"
                  id="bank"
                  value="true"
                  :disabled="bankDisabled"
                  v-model="bankPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/embankment_flooded_circle.png"
                  />
                  <label for="bank" class="legend-label">{{
                    this.embankmentFlooded()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.embankmentFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="pathDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="path"
                  id="path"
                  value="true"
                  :disabled="pathDisabled"
                  v-model="pathPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/path_flooded_circle.png"
                  />
                  <label for="path" class="legend-label">{{
                    this.pathFlooded()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.pathFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="roadDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="road"
                  id="road"
                  value="true"
                  :disabled="roadDisabled"
                  v-model="roadPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/car_flooded_circle.png"
                  />
                  <label for="road" class="legend-label">{{
                    this.roadFlooded()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.roadFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="bridgeRiskDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="bridgeRisk"
                  id="bridgeRisk"
                  value="true"
                  :disabled="bridgeRiskDisabled"
                  v-model="bridgeRiskPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/bridge_risk_circle.png"
                  />
                  <label for="bridgeRisk" class="legend-label">{{
                    bridgeFloodRisk()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ bridgeAtRiskTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="bridgeDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="bridge"
                  id="bridge"
                  value="true"
                  :disabled="bridgeDisabled"
                  v-model="bridgePicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/bridge_flooded_circle.png"
                  />
                  <label for="bridge" class="legend-label">{{
                    this.bridgeFlooded()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ bridgeFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="facilityDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="facility"
                  id="facility"
                  value="true"
                  :disabled="facilityDisabled"
                  v-model="facilityPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img
                    class="activeIcons"
                    src="../assets/aq-icons/building_flooded_circle.png"
                  />
                  <label for="facility" class="legend-label">{{
                    this.facilityFlooded()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.facilityFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="bfeDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="bfe"
                  id="bfe"
                  value="true"
                  :disabled="bfeDisabled"
                  v-model="bfePicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img class="activeIcons" src="../assets/aq-icons/BFE.png" />
                  <label for="bfe" class="legend-label">{{
                    this.baseFloodElevation()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.baseFloodedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
              <div id="otherDiv">
                <v-simple-checkbox
                  type="checkbox"
                  ref="other"
                  id="other"
                  value="true"
                  :disabled="otherDisabled"
                  v-model="otherPicked"
                ></v-simple-checkbox>
                <div class="sublayer-icon">
                  <img class="activeIcons" src="../assets/aq-icons/other.png" />
                  <label for="other" class="legend-label">{{
                    this.uncategorized()
                  }}</label>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        color="blue lighten-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information
                      </v-icon>
                    </template>
                    <span>{{ this.uncategorizedTooltip() }}</span>
                  </v-tooltip>
                </div>
                <br />
              </div>
            </div>
            <div id="showAllBtn">
              <v-btn
                id="showAll"
                small
                outlined
                color="blue lighten-1"
                @click="callShowAll"
                :disabled="showAllDisabled"
                >{{ this.showActive() }}</v-btn
              >
            </div>
            <v-simple-checkbox
              type="checkbox"
              ref="allRP"
              id="allRP"
              value="true"
              v-model="allRPPicked"
            ></v-simple-checkbox>
            <div class="legend-icon">
              <div
                class="wmm-circle wmm-white wmm-icon-noicon wmm-size-20"
              ></div>
              <label for="allRP" class="legend-label">{{
                this.allFeatures()
              }}</label>
            </div>
            <v-icon
              class="opIcon"
              @click="showAllFeaturesSlider = !showAllFeaturesSlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showAllFeaturesSlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ allFeaturesOpacity }}
              <v-slider
                v-model="allFeaturesOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>
            <br />
            <div class="zoom-alert" :style="{ display: isDisplayed }">
              {{ this.streamgageDesc() }}
            </div>
            <div>
              <v-simple-checkbox
                type="checkbox"
                ref="stream"
                id="stream"
                value="false"
                v-model="streamgagePicked"
                :disabled="streamCheckDisabled"
              ></v-simple-checkbox>
              <div class="legend-icon">
                <div
                  class="
                    wmm-circle
                    wmm-mutedblue
                    wmm-icon-triangle
                    wmm-icon-black
                    wmm-size-20
                    wmm-borderless
                  "
                ></div>
                <label for="stream" class="legend-label"
                  >{{ this.streamgageLabel() }}
                </label>
              </div>
            </div>
            <v-icon
              class="opIcon"
              @click="showRTSlider = !showRTSlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showRTSlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ rtOpacity }}
              <v-slider
                v-model="rtOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>
            <br />

            <div class="subsection-title" id="additional-flooding-layer-title">
              {{ addFloodLayers() }}
            </div>

            <v-simple-checkbox
              type="checkbox"
              ref="nfhl"
              id="nfhl"
              value="false"
              v-model="nfhlPicked"
            ></v-simple-checkbox>
            <div class="legend-no-icon">
              <label for="nfhl">{{ this.femaLayer() }}</label>
            </div>
            <v-icon
              @click="showNFHLSlider = !showNFHLSlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showNFHLSlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ nfhlOpacity }}
              <v-slider
                v-model="nfhlOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>

            <br />

            <v-simple-checkbox
              type="checkbox"
              ref="radar"
              id="radar"
              value="false"
              v-model="radarPicked"
            ></v-simple-checkbox>
            <div class="legend-no-icon">
              <label for="radar">{{ this.noaaRadarLayer() }}</label>
            </div>
            <v-icon
              @click="showNWSSlider = !showNWSSlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showNWSSlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ nwsOpacity }}
              <v-slider
                v-model="nwsOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>

            <br />

            <v-simple-checkbox
              type="checkbox"
              ref="fww"
              id="fww"
              value="false"
              v-model="fwwPicked"
            ></v-simple-checkbox>
            <div class="legend-no-icon">
              <label for="fww">{{ this.noaaFloodLayer() }}</label>
            </div>
            <v-icon
              @click="showFWWSlider = !showFWWSlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showFWWSlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ fwwOpacity }}
              <v-slider
                v-model="fwwOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>

            <div class="subsection-title" id="supporting-layer-title">
              {{ this.supportingLayers() }}
            </div>

            <v-simple-checkbox
              type="checkbox"
              ref="noaa"
              id="noaa"
              value="false"
              v-model="noaaPicked"
            ></v-simple-checkbox>
            <div class="legend-icon">
              <div
                class="
                  wmm-diamond
                  wmm-lime
                  wmm-icon-triangle
                  wmm-icon-black
                  wmm-size-15
                  wmm-borderless
                "
              ></div>
              <label for="noaa" style="padding-left: 15px">{{
                this.noaaTides()
              }}</label>
            </div>
            <v-icon
              class="opIcon"
              @click="showNOAASlider = !showNOAASlider"
              small
              color="blue lighten-1"
              dark
            >
              mdi-circle-opacity
            </v-icon>
            <div v-if="showNOAASlider" class="sliders">
              {{ this.opacity() }}: &nbsp; {{ noaaOpacity }}
              <v-slider
                v-model="noaaOpacity"
                color="grey darken-2"
                track-color="white"
                max="1"
                min="0"
                step="0.01"
              ></v-slider>
            </div>
            <br />
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import { Ripple } from "vuetify/lib/directives";
import DatePicker from "@/components/DatePicker";
import { text } from "../mixins/text.js";

export default {
  mixins: [text],
  components: {
    DatePicker,
  },
  data() {
    return {
      picked: [],
      streamCheckDisabled: true,
      isDisplayed: "block",
      thresholdsExceededMessage: "0",
      isFlooding: false,
      showRTSlider: false,
      showAllFeaturesSlider: false,
      showNOAASlider: false,
      showNFHLSlider: false,
      showNWSSlider: false,
      showFWWSlider: false,
    };
  },
  props: ["currentZoom"],
  methods: {
    callShowAll() {
      eventBus.$emit("showAll");
    },
  },
  directives: {
    Ripple,
  },
  computed: {
    // use v-model to set basemap state
    selected: {
      get() {
        return this.$store.state.basemapState;
      },
      set(value) {
        return this.$store.commit("getBasemapState", value);
      },
    },
    // use v-model to set streamgage layer state
    streamgagePicked: {
      get() {
        return this.$store.state.streamgageState;
      },
      set(value) {
        return this.$store.commit("getStreamgageState", value);
      },
    },
    radarPicked: {
      get() {
        return this.$store.state.radarState;
      },
      set(value) {
        return this.$store.commit("getRadarState", value);
      },
    },
    // use v-model to set nfhl layer state
    nfhlPicked: {
      get() {
        return this.$store.state.nfhlState;
      },
      set(value) {
        return this.$store.commit("getNfhlState", value);
      },
    },
    // use v-model to set nfhl layer state
    allRPPicked: {
      get() {
        return this.$store.state.allRPState;
      },
      set(value) {
        return this.$store.commit("getallRPState", value);
      },
    },
    noaaPicked: {
      get() {
        return this.$store.state.noaaState;
      },
      set(value) {
        return this.$store.commit("getNoaaState", value);
      },
    },
    fwwPicked: {
      get() {
        return this.$store.state.fwwState;
      },
      set(value) {
        return this.$store.commit("getFwwState", value);
      },
    },
    bankPicked: {
      get() {
        return this.$store.state.bankState;
      },
      set(value) {
        return this.$store.commit("getBankState", value);
      },
    },
    bankDisabled: {
      get() {
        return this.$store.state.bankDisabled;
      },
      set(value) {
        return this.$store.commit("getBankDisabledState", value);
      },
    },
    pathPicked: {
      get() {
        return this.$store.state.pathState;
      },
      set(value) {
        return this.$store.commit("getPathState", value);
      },
    },
    pathDisabled: {
      get() {
        return this.$store.state.pathDisabled;
      },
      set(value) {
        return this.$store.commit("getPathDisabledState", value);
      },
    },
    roadPicked: {
      get() {
        return this.$store.state.roadState;
      },
      set(value) {
        return this.$store.commit("getRoadState", value);
      },
    },
    roadDisabled: {
      get() {
        return this.$store.state.roadDisabled;
      },
      set(value) {
        return this.$store.commit("getRoadDisabledState", value);
      },
    },
    bridgeRiskPicked: {
      get() {
        return this.$store.state.bridgeRiskState;
      },
      set(value) {
        return this.$store.commit("getBridgeRiskState", value);
      },
    },
    bridgeRiskDisabled: {
      get() {
        return this.$store.state.bridgeRiskDisabled;
      },
      set(value) {
        return this.$store.commit("getBridgeRiskDisabledState", value);
      },
    },
    bridgePicked: {
      get() {
        return this.$store.state.bridgeState;
      },
      set(value) {
        return this.$store.commit("getBridgeState", value);
      },
    },
    bridgeDisabled: {
      get() {
        return this.$store.state.bridgeDisabled;
      },
      set(value) {
        return this.$store.commit("getBridgeDisabledState", value);
      },
    },
    facilityPicked: {
      get() {
        return this.$store.state.facilityState;
      },
      set(value) {
        return this.$store.commit("getFacilityState", value);
      },
    },
    facilityDisabled: {
      get() {
        return this.$store.state.facilityDisabled;
      },
      set(value) {
        return this.$store.commit("getFacilityDisabledState", value);
      },
    },
    bfePicked: {
      get() {
        return this.$store.state.bfeState;
      },
      set(value) {
        return this.$store.commit("getBfeState", value);
      },
    },
    bfeDisabled: {
      get() {
        return this.$store.state.bfeDisabled;
      },
      set(value) {
        return this.$store.commit("getBfeDisabledState", value);
      },
    },
    otherPicked: {
      get() {
        return this.$store.state.otherState;
      },
      set(value) {
        return this.$store.commit("getOtherState", value);
      },
    },
    otherDisabled: {
      get() {
        return this.$store.state.otherDisabled;
      },
      set(value) {
        return this.$store.commit("getOtherDisabledState", value);
      },
    },
    showAllDisabled: {
      get() {
        return this.$store.state.showAllDisabled;
      },
      set(value) {
        return this.$store.commit("getShowAllDisabled", value);
      },
    },
    rtOpacity: {
      get() {
        return this.$store.state.rtOpacity;
      },
      set(value) {
        return this.$store.commit("getRtOpacity", value);
      },
    },
    allFeaturesOpacity: {
      get() {
        return this.$store.state.allFeaturesOpacity;
      },
      set(value) {
        return this.$store.commit("getAllFeaturesOpacity", value);
      },
    },
    noaaOpacity: {
      get() {
        return this.$store.state.noaaOpacity;
      },
      set(value) {
        return this.$store.commit("getnoaaOpacity", value);
      },
    },
    nfhlOpacity: {
      get() {
        return this.$store.state.nfhlOpacity;
      },
      set(value) {
        return this.$store.commit("getnfhlOpacity", value);
      },
    },
    nwsOpacity: {
      get() {
        return this.$store.state.nwsOpacity;
      },
      set(value) {
        return this.$store.commit("getnwsOpacity", value);
      },
    },
    fwwOpacity: {
      get() {
        return this.$store.state.fwwOpacity;
      },
      set(value) {
        return this.$store.commit("getfwwOpacity", value);
      },
    },
  },
  // Watch the current zoom value to disable checkbox
  watch: {
    "$store.state.currentZoomState": function () {
      if (this.$store.state.currentZoomState >= 9) {
        this.streamCheckDisabled = false;
        this.isDisplayed = "none";
      } else {
        this.streamCheckDisabled = true;
        this.isDisplayed = "block";
      }
    },
    "$store.state.thresholdsExceededCount": function () {
      this.thresholdsExceededMessage =
        this.$store.state.thresholdsExceededCount.toString();
      if (this.thresholdsExceededMessage !== "0") {
        this.isFlooding = true;
      } else {
        this.isFlooding = false;
      }
    },
  },
};
</script>

<style>
.v-expansion-panel-header {
  text-transform: capitalize;
  font-weight: 700;
  text-align: right;
  color: #333;
}

.v-btn-toggle {
  flex-direction: column;
  width: 100%;
}

.basemapThumb {
  border: 0.5px solid #ffffff;
  border-radius: 2px;
  margin-right: 15px;
  height: 25px;
}

.basemapBtn {
  width: 100%;
  justify-content: left !important;
}

.v-btn {
  font-weight: 400 !important;
  text-transform: capitalize !important;
  letter-spacing: 0 !important;
}

.v-btn__content label {
  color: #333;
}

.v-btn-toggle > .v-btn.v-btn {
  opacity: 1 !important;
}

.legend-icon {
  display: inline-block;
  position: relative;
  margin: 10px;
  line-height: 24px;
  height: 24px;
  margin-right: -8px;
}

.legend-icon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 22px;
  color: #333;
  font-size: 12px;
}

.legend-no-icon {
  display: inline-block;
  position: relative;
  margin: 10px;
  line-height: 24px;
  height: 24px;
}

.legend-no-icon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  color: #333;
  font-size: 12px;
  margin-right: -10px;
}

.legendIcon label {
  color: #333;
}

.legend-icon .wmm-circle {
  left: 6px;
}

.zoom-alert {
  font-size: small;
}

#allRPIcon {
  margin-top: 0 !important;
  width: 30px !important;
  padding-left: 3px !important;
}

#allRPLegend {
  margin-top: 0 !important;
  width: 30px !important;
}

.subsection-title {
  font-weight: bold;
  font-size: 14px;
}

#activeLayerTitle {
  display: none;
  font-size: 14px;
  padding-top: 10px;
}

#supporting-layer-title,
#additional-flooding-layer-title {
  padding-top: 14px;
}

#siteLayersContent {
  margin: -10px -8px -10px -2px;
}

.legend-label {
  margin-left: -2px;
  padding-right: 2px;
}

#activeSublayers {
  padding-left: 8px;
}

.activeIcons {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.sublayer-icon {
  display: inline-block;
  position: relative;
  margin: 10px;
  line-height: 24px;
  height: 24px;
}

.sublayer-icon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 10px;
  color: #333;
  font-size: 14px;
}

#showAllBtn {
  display: none;
  justify-content: center;
  padding: 10px;
}

#noActiveFlooding {
  text-align: left;
  padding-top: 10px;
  font-size: 14px;
}

.v-simple-checkbox {
  display: inline-block;
}

.v-input--selection-controls__input {
  margin-right: 0 !important;
}

.threshold-alert {
  font-weight: bold;
  color: #fb8c00 !important;
  display: block !important;
}
.noflooding-alert {
  font-weight: bold;
  color: #00ab2e !important;
  display: block !important;
}

.v-expansion-panel-content__wrap {
  padding-left: 12px !important;
}

.sliders {
  background-color: black;
  opacity: 0.75;
  position: relative;
  z-index: 999;
  width: 80%;
  height: 60px;
  color: white;
  border-radius: 5px 5px 5px 5px;
  padding: 5px;
  margin: auto;
  font-size: 12px;
}

.opIcon {
  padding-left: 8px;
}
</style>
