<template>
  <v-app>
    <Sidebar></Sidebar>
    <v-app-bar app style="background-color: #0a0a57">
      <v-app-bar-nav-icon @click="drawerState = !drawerState" style="color: white"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white">Real-Time Flood Impact Map</v-toolbar-title>
      <Geosearch :map="map"></Geosearch>
    </v-app-bar>
    <Map @getMap="getChildMap" @emitTileProviders="selectBasemap"></Map>
  </v-app>
</template>

<script>
// imports
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Geosearch from '@/components/Geosearch';
export default {
  components: {
    Sidebar,
    Map,
    Geosearch,
  },
  data: function () {
        return {
            map: '',
            tileProviders: []
        }
  },
  computed: {
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    },
  },
  // Watch basemap state and update visibility when state changes
  watch: {
    '$store.state.basemapState': function (){
      this.selectBasemap(this.tileProviders);
    }
  },
  methods: {
    // Makes map accessible from other child components (need for geosearch)
    getChildMap(mapObject){
      this.map = mapObject;
    },
    // compare tile provider name to basemap state and set visibility
    selectBasemap(tileProviders) {
      this.tileProviders = tileProviders;
      for (let i = 0; i < tileProviders.length; i++){
        if(this.$store.state.basemapState == tileProviders[i].name){
          tileProviders[i].visible = true;
        }else{
          tileProviders[i].visible = false;
        }
      }
    }
  }
};
</script>
