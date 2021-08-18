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
          <v-toolbar-title style="color: white">
          <a href="https://www.usgs.gov/" target="_blank">
            <div class="toolbar-image">
              <img alt="USGS logo" height="60px" src="../public/usgs.png" />
            </div>
            </a>
            <div class="toolbar-text">
              <span class="main-title">Real-Time Flood Impact Map</span>
              <span class="pre-alpha">Pre-Alpha: Under Active Development</span>
              <span class="mini-title"><h1>Real-Time Flood Impact Map</h1><br><h2>Pre-Alpha: Under Active Development</h2></span>
            </div></v-toolbar-title>
          <Geosearch :map="map"></Geosearch>
        </v-app-bar>
        <Map v-if="mounted" @getMap="getChildMap"></Map>
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
      mounted: false,
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
    // Set height variable for use in css using usa-banner height
    getBannerHeight() {
      let bannerHeight =
        document.getElementsByClassName("usa-banner__header")[0].clientHeight;
      document.documentElement.style.setProperty(
        "--height",
        `calc(100vh - ${bannerHeight}px)`
      );
    },
  },
  mounted() {
    // When page loads or resizes, calculate height of v-app
    this.getBannerHeight();
    window.addEventListener("resize", this.getBannerHeight);
    // Need to mount parent before rendering Map component, otherwise height change will break intial map zoom
    this.mounted = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Public+Sans:100,300,400,500,700,900");

html {
  overflow-y: auto;
  height: 100%;
}

div > .v-application--wrap {
  min-height: 100vh;
  min-height: var(--height);
}

body {
  margin: 0;
  min-height: 100%;
  overflow: hidden;
}

html,
body {
  font-family: "Public Sans", sans-serif;
  color: #333;
}

#app {
  font-family: "Public Sans", sans-serif !important;
  color: #333;
}

.toolbar-image {
  display: inline-block;
  float: left;
  margin-top: 10px;
  margin-left: -20px;
}

.toolbar-text {
  display: inline-block;
  line-height: 64px;
  float: left;
  margin-top: 8px;
  padding-left: 10px;
  font-size: 21px;
}

.pre-alpha {
  font-size: 15px;
  color: red;
  padding-left: 10px;
  font-style: italic;
}

@media screen and (max-width: 1300px) {
  .toolbar-text {
    font-size: 18px;
  }
  .pre-alpha {
    font-size: 12px;
  }
}

@media screen and (max-width: 900px) {
  .toolbar-text {
    margin-left: -28px;
    margin-bottom: 10px;
  }
  .toolbar-image {
    display: none;
  }
}

@media screen and (max-width: 828px) {
  .pre-alpha {
    font-size: 12px;
  }
}

@media screen and (max-width: 690px) {
  .toolbar-text {
    font-size: 14px;
  }
  .pre-alpha {
    font-size: 10px;
  }
}

@media screen and (min-width: 600px) {
  .mini-title {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .main-title, .pre-alpha {
    display: none;
  }
  .toolbar-text {
    margin-bottom: -5px;
  }
  .mini-title {
    display: inline-block;
    margin-left: 8px;
    line-height: 8px;
  }
  .mini-title h1 {
    color: white;
    font-size: 14px;
    margin: 0;
    font-weight: normal;
  }
  .mini-title h2 {
    color: red;
    font-size: 10px;
    font-weight: normal;
  }
}

@media screen and (max-width: 416px) {
  .toolbar-text {
    display: none;
  }
}
</style>
