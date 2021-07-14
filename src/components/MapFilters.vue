<template>
  <v-expansion-panels>
    <!-- Filters Section -->
    <v-expansion-panel>
      <v-expansion-panel-header>
        Basemaps
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="px-0" fluid>
          <v-btn-toggle borderless>
            <v-btn text id="streets" class="basemapBtn" value="Streets" @click="selected = 'Streets'">
              <img class="basemapThumb" alt="" src="../assets/streets.jpg"><label for="streets">Streets</label>
            </v-btn>
            <v-btn text id="satellite" class="basemapBtn" value="Satellite" @click="selected = 'Satellite'" >
              <img class="basemapThumb" alt="" src="../assets/satellite.jpg"><label for="satellite">Satellite</label>
            </v-btn>
            <v-btn text id="topo" class="basemapBtn" value="Topo" @click="selected = 'Topo'" >
              <img class="basemapThumb" alt="" src="../assets/topo.jpg"><label for="topo">Topo</label>
            </v-btn>
            <v-btn text id="terrain" class="basemapBtn" value="Terrain" @click="selected = 'Terrain'" >
              <img class="basemapThumb" alt="" src="../assets/terrain.jpg"><label for="terrain">Terrain</label>
            </v-btn>
            <v-btn text id="gray" class="basemapBtn" value="Gray" @click="selected = 'Gray'" >
              <img class="basemapThumb" alt="" src="../assets/gray.jpg"><label for="gray">Gray</label>
            </v-btn>
            <v-btn text id="natgeo" class="basemapBtn" value="NatGeo" @click="selected = 'NatGeo'" >
              <img class="basemapThumb" alt="" src="../assets/natgeo.jpg"><label for="natgeo">NatGeo</label>
            </v-btn>
          </v-btn-toggle>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Streamgages
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="px-0" fluid>
        <!-- these are not actually linked to anything right now, just an example of what is possible! -->
            <input type="checkbox" id="stream" value="Stream" v-model="picked" />
              <label for="stream">Real-time Stream Gage</label>
              <br/>
            <input type="checkbox" id="rain" value="Rain" v-model="picked" />
              <label for="rain">Real-time Rain Gage</label>
              <br/>
            <input type="checkbox" id="tidal" value="Tidal" v-model="picked" />
              <label for="tidal">Tidal Gage</label>
              <br/>
              <span>Checked Gages: {{ picked }}</span>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    data () {
      return {
        picked: [],
      }
    },
    computed: {
      // use v-model to set basemap state
      selected: {
        get() {
          console.log(this.$store.state.basemapState)
          return this.$store.state.basemapState;
        },
        set(value) {
          return this.$store.commit("getBasemapState", value);
        },
      },
  },
  }
</script>

<style>
.v-expansion-panel-header{
  text-transform: uppercase;
  font-weight: 700;
  text-align: right;
}

.v-btn-toggle{
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
}

.v-btn{
  justify-content: left !important;
  font-weight: 400 !important;
}

.v-btn-toggle > .v-btn.v-btn{
  opacity: 1 !important;
}

.v-btn__content{
  color: #6F758E !important;
}
</style>