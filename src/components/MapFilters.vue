<template>
  <v-expansion-panels>
    <!-- Filters Section -->
    <v-expansion-panel>
      <v-expansion-panel-header>
        Basemaps
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="px-0" fluid>
        <!-- these are not actually linked to anything right now, just an example of what is possible! -->
            <input type="radio" id="streets" value="Streets" v-model="selected" />
              <label for="streets">Streets</label>
              <br/>
            <input type="radio" id="satellite" value="Satellite" v-model="selected" />
              <label for="satellite">Satellite</label>
              <br/>
            <input type="radio" id="topo" value="Topo" v-model="selected" />
              <label for="topo">Topo</label>
              <br/>
            <input type="radio" id="terrain" value="Terrain" v-model="selected" />
              <label for="terrain">Terrain</label>
              <br/>
            <input type="radio" id="gray" value="Gray" v-model="selected" />
              <label for="gray">Gray</label>
              <br/>
            <input type="radio" id="natgeo" value="NatGeo" v-model="selected" />
              <label for="natgeo">NatGeo</label>
              <br/>
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
          return this.$store.state.basemapState;
        },
        set(value) {
          return this.$store.commit("getBasemapState", value);
        },
      },
  },
  }
</script>