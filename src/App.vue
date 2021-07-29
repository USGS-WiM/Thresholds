<template>
  <div id="outerDiv">
    <USABanner></USABanner>
    <div style="position: relative">
      <v-app>
        <Sidebar style="position: absolute"></Sidebar>
        <v-app-bar app style="background-color: #0a0a57" absolute>
          <v-app-bar-nav-icon
            @click="drawerState = !drawerState"
            style="color: white"
          ></v-app-bar-nav-icon>
          <v-toolbar-title style="color: white"
            >Real-Time Flood Impact Map
            <div class="toolbar-image">
              <img alt="USGS logo" height="60px" src="../public/usgs.png" />
            </div>
            <div class="toolbar-text">
              <span>Real-Time Flood Impact Map</span>
            </div></v-toolbar-title
          >
          <Geosearch :map="map"></Geosearch>
        </v-app-bar>
        <Map @getMap="getChildMap"></Map>
      </v-app>
    </div>
  </div>
</template>

<script>
// imports
import USABanner from "@/components/USABanner";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Geosearch from "@/components/Geosearch";
export default {
  components: {
    USABanner,
    Sidebar,
    Map,
    Geosearch,
  },
  data: function () {
    return {
      map: "",
      tileProviders: [],
    };
  },
  computed: {
    drawerState: {
      get() {
        return this.$store.getters.drawerState;
      },
      set(v) {
        return this.$store.commit("toggleDrawerState", v);
      },
    },
  },
  methods: {
    // Makes map accessible from other child components (need for geosearch)
    getChildMap(mapObject) {
      this.map = mapObject;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Public+Sans:100,300,400,500,700,900");

html {
  overflow-y: auto;
}

html,
body {
  height: 100%;
  margin: 0;
}

html,
body {
  font-family: "Public Sans", sans-serif;
}

#app {
  font-family: "Public Sans", sans-serif !important;
}

.toolbar-image {
  display: inline-block;
  float: left;
  margin-top: 10px;
}

.toolbar-text {
  display: inline-block;
  line-height: 64px;
  float: left;
  margin-top: 8px;
  padding-left: 20px;
  font-size: 25px;
}
</style>
