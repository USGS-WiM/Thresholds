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
              <span class="main-title">{{ this.title() }}</span>
              <span class="beta-subtitle"> {{ this.pilot() }}</span>
              <span class="mini-title"
                ><h1>Real-Time Flood Impact Map</h1>
                <br />
                <h2>Beta</h2></span
              >
            </div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="white"
                v-bind="attrs"
                v-on="on"
                @click="spanishState = !spanishState"
              >
                <v-icon color="#0a0a57">mdi-translate</v-icon>
                <span v-if="!spanishState">Español</span>
                <span v-if="spanishState">English</span>
              </v-btn>
            </template>
            <span v-if="!spanishState">Traducir al español </span
            ><span v-if="spanishState">Translate to English </span></v-tooltip
          >
          <About></About>
        </v-app-bar>
        <Map v-if="mounted"></Map>
      </v-app>
    </div>
  </div>
</template>

<script>
// imports
import USABanner from "@/components/USABanner";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import About from "@/components/About";
import { text } from "./mixins/text";

export default {
  mixins: [text],
  components: {
    USABanner,
    Sidebar,
    Map,
    About,
  },
  data: function () {
    return {
      map: "",
      tileProviders: [],
      mounted: false,
      text,
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
    spanishState: {
      get() {
        return this.$store.getters.spanishState;
      },
      set(v) {
        localStorage.setItem("spanishState", v); // saving state to local storage for return users
        return this.$store.commit("getSpanishState", v);
      },
    },
  },
  methods: {
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

    // checking state and loading app in selected language
    let localSpanishState = localStorage.getItem("spanishState");
    if (localSpanishState == "true") {
      this.spanishState = true;
    } else {
      this.spanishState = false;
    }

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

.beta-subtitle {
  font-size: 18px;
  color: red;
  padding-left: 10px;
  font-style: italic;
}

@media screen and (max-width: 1300px) {
  .toolbar-text {
    font-size: 18px;
  }
  .beta-subtitle {
    font-size: 16px;
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

@media screen and (min-width: 640px) {
  .mini-title {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .main-title,
  .beta-subtitle {
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
    font-size: 12px;
    font-weight: normal;
    font-style: italic;
  }
}

@media screen and (max-width: 450px) {
  .toolbar-text {
    margin-left: -38px;
  }
  .mini-title h1 {
    font-size: 11px;
  }
  .mini-title h2 {
    font-size: 8px;
  }
}
</style>
