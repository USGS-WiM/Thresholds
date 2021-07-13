<template>
  <v-app>
    <Sidebar></Sidebar>
    <v-app-bar app style="background-color: #0a0a57">
      <v-app-bar-nav-icon @click="drawerState = !drawerState" style="color: white"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white">Real-Time Flood Impact Map</v-toolbar-title>
      <Geosearch :map="map"></Geosearch>
    </v-app-bar>
    <Map @getMap="getChildMap"></Map>
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
            map: ''
        }
  },
  computed: {
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    },
  },
  methods: {
    getChildMap(mapObject){
      this.map = mapObject;
    }
  }
};
</script>
