<template>
  <v-expansion-panels>
    <!-- Filters Section -->
    <v-expansion-panel>
      <v-expansion-panel-header> Basemaps </v-expansion-panel-header>
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
              /><label for="streets">Streets</label>
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
              /><label for="satellite">Satellite</label>
            </v-btn>
            <v-btn
              text
              id="topo"
              class="basemapBtn"
              value="Topo"
              @click="selected = 'Topo'"
            >
              <img class="basemapThumb" alt="" src="../assets/topo.jpg" /><label
                for="topo"
                >Topo</label
              >
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
              /><label for="terrain">Terrain</label>
            </v-btn>
            <v-btn
              text
              id="gray"
              class="basemapBtn"
              value="Gray"
              @click="selected = 'Gray'"
            >
              <img class="basemapThumb" alt="" src="../assets/gray.jpg" /><label
                for="gray"
                >Gray</label
              >
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
              /><label for="natgeo">NatGeo</label>
            </v-btn>
          </v-btn-toggle>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header> Layers </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="px-0" fluid>
          <div class="zoom-alert" :style="{ display: isDisplayed }">
            Real-time Streamgages available at zoom level 9 and above. Please
            zoom in to view.
          </div>
          <!-- these are not actually linked to anything right now, just an example of what is possible! -->
          <input
            type="checkbox"
            ref="stream"
            id="stream"
            value="false"
            v-model="streamgagePicked"
            :disabled="streamCheckDisabled"
          />
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
            <label for="stream">Real-time Stream Gage</label>
          </div>
          <br />
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      picked: [],
      streamCheckDisabled: true,
      isDisplayed: "block"
    };
  },
  props: ["currentZoom"],
  computed: {
    // use v-model to set basemap state
    selected: {
      get() {
        return this.$store.state.basemapState;
      },
      set(value) {
        return this.$store.commit("getBasemapState", value);
      }
    },
    // use v-model to set streamgage layer state
    streamgagePicked: {
      get() {
        return this.$store.state.streamgageState;
      },
      set(value) {
        return this.$store.commit("getStreamgageState", value);
      }
    }
  },
  // Watch the current zoom value to disable checkbox
  watch: {
    "$store.state.currentZoomState": function() {
      if (this.$store.state.currentZoomState >= 9) {
        this.streamCheckDisabled = false;
        this.isDisplayed = "none";
      } else {
        this.streamCheckDisabled = true;
        this.isDisplayed = "block";
      }
    }
  }
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
}

.legend-icon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 22px;
  color: #333;
  font-size: 14px;
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

</style>
