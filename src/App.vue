<template>
  <v-app>
    <Sidebar></Sidebar>
    <v-app-bar app style="background-color: #0a0a57">
      <v-app-bar-nav-icon @click="drawerState = !drawerState" style="color: white"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white">Real-Time Flood Impact Map</v-toolbar-title>
    </v-app-bar>
    <Map></Map>
  </v-app>
</template>

<script>
// imports
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
export default {
  components: {
    Sidebar,
    Map,
  },
  computed: {
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    },
  },
};
</script>
