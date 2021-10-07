<template>
  <v-main>
    <div style="height: 100%; width: 100%">
      <div
        id="nwisLoadingAlert"
        class="alert nwisAlertClass fade"
        role="alert"
        :style="{ display: isDisplayed, opacity: alertOpacity }"
      >
        <v-progress-circular
          indeterminate
          :width="3"
          :size="10"
        ></v-progress-circular>
        <span class="loadingLabel">Loading Layer...</span>
      </div>
      <div
        id="nfhlLoadingAlert"
        class="alert nfhlAlertClass fade"
        role="alert"
        :style="{ display: nfhlIsDisplayed, opacity: alertOpacity }"
        load: 
      >
        <v-progress-circular
          indeterminate
          :width="3"
          :size="10"
        ></v-progress-circular>
        <span class="loadingLabel">Loading Layer...</span>
      </div>
      <div
        id="nfhlServicesError"
        class="alert nfhlServicesAlertClass fade"
        role="alert"
        :style="{ display: nfhlServicesAlertDisplayed, opacity: alertOpacity }"
        load: 
      >
        <span class="loadingLabel">Error loading NFHL services</span>
      </div>
      <div id="fullscreenPopup">
      </div>
      <!-- a leaflet map -->
      <div id="map">
      <div id="findLocationContainer"><Geosearch :map="map"></Geosearch></div>
        <!-- Legend -->
        <v-expansion-panels id="legendContainer">
          <v-expansion-panel>
            <!-- Legend title -->
            <v-expansion-panel-header id="titleContainer">
              <div id="legendExplanation">Legend</div>
              <div id="legendExplanationMobile"><v-icon 
                small
                color="#333"
                >mdi mdi-map-legend</v-icon></div>
            </v-expansion-panel-header>
            <v-expansion-panel-content id="legendContent">
            <!-- Threshold icons -->
              <div id="thresholdLayers">
                <div id="thresholdLayersTitle" v-if="activeLayerTitleVisible">Active Flooding</div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/embankment_flooded_circle.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Embankment Flooded</label>
                    <v-tooltip left>
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
                    <span>Flood waters exit the stream/river channel and overflow onto a flat surface</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/path_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Path Flooded</label>
                    <v-tooltip left>
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
                    <span>Flood waters are flooding a pedestrian greenway/trail/path</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/car_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Road Flooded</label>
                    <v-tooltip left>
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
                    <span>Low lying areas along roads are flooding</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/bridge_risk_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flood at Risk</label>
                    <v-tooltip left>
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
                    <span>Water from a river or stream is under the lowest section of a bridge</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/bridge_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flooded</label>
                    <v-tooltip left>
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
                    <span>A bridge is flooding</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/building_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Facility Flooded</label>
                    <v-tooltip left>
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
                    <span>Structures/facilities are flooding</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/BFE.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Base Flood Elevation</label>
                    <v-tooltip left>
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
                    <span>The FEMA 100-year BFE has been reached</span>
                  </v-tooltip>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/other.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Uncategorized</label>
                    <v-tooltip left>
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
                    <span>Other Reference Points are experiencing flooding (parking lot, campground, railroad, etc).</span>
                  </v-tooltip>
                </div>
              </div>
              <!-- Toggleable layers -->
              <div id="toggleableLayers">
                <div class="legendIconToggle" v-if="allRPVisible">
                  <div
                    style="padding-right: 10px;"
                    id="allRPLegend"
                    class="
                      wmm-circle
                      wmm-white
                      wmm-icon-noicon
                      wmm-size-20
                    "
                  ></div>
                  <label
                    >All Features</label
                  >
                </div>
                <div class="legendIconToggle" v-if="streamgageVisible">
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
                  <label>USGS Real-time Streamgage</label>
                </div>

                <div class="legendIconToggle" v-if="nfhlVisible">
                  <label id="nfhlLabel">FEMA National Flood Hazard Layer</label>
                </div>
                <div id="nfhlLegend"></div>
              </div>

              <div class="legendIconToggle" v-if="radarVisible">
                  <label id="radarLabel">NOAA National Weather Service Radar</label>
                  <div id="radarLegend"></div>
                </div>

                <div class="legendIconToggle" v-if="fwwVisible">
                  <label id="fwwLabel">NOAA Flood Watches and Warnings</label>
                </div>
                <div id="fwwLegend"></div>

                <div class="legendIconToggle" v-if="tidesVisible">
                  <div class="wmm-diamond wmm-lime wmm-icon-triangle wmm-icon-black wmm-size-15 wmm-borderless"></div>
                  <label id="noaaLabel">NOAA Tides &amp; Current Stations</label>
                </div>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <v-dialog v-model="noFloodingdialog" max-width="250">
      <v-card>
        <v-card-title class="text-h6 green lighten-2">
          No Active Flooding
        </v-card-title>

        <v-card-text> Displaying all features. </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="noFloodingdialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import L from "leaflet"; //this is where you import leaflet components
import "leaflet/dist/leaflet.css";
import * as esri from "esri-leaflet";
import mvpAqData from "../mvp_data/output.json";
import Geosearch from "@/components/Geosearch";
import axios from "axios";
import Plotly from "plotly.js";
import { eventBus } from "../main.js";

// this code is necessary for the default leaflet marker to work
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

//define basemaps
var tileProviders = [
  {
    name: "Streets",
    attribution: "Esri",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  },
  {
    name: "Satellite",
    attribution:
      "Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    name: "Topo",
    attribution: "Esri",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  },
  {
    name: "Terrain",
    attribution: "Esri, NAVTEQ, DeLorme",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
  },
  {
    name: "Gray",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: "Esri, NAVTEQ, DeLorme",
  },
  {
    name: "NatGeo",
    attribution: "Esri",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  },
];

// Variables for NWIS sites query
let parameterCodeList = "00065,63160,72214";
let siteTypeList = "OC,OC-CO,ES,LK,ST,ST-CA,ST-DCH,ST-TS";
let siteStatus = "active";

let graphParameterCodeList = "00065,63160,72279";

export default {
  components:{
    Geosearch
  },
  name: "Map",
  data() {
    return {
      map: null,
      zoom: 4,
      lat: 37.0902,
      lon: -82.7129,
      center: L.latLng(37.0902, -82.7129),
      tileProviders: tileProviders,
      streamgageMarkers: [],
      radarLayer: {},
      radarVisible: false,
      aqMarkers: [],
      allRPMarkers: [],
      tideMarkers: [],
      nfhlLayer: {},
      nfhlVisible: false,
      fwwLayer: {},
      fwwVisible: false,
      popupContent: "",
      aqPopupContent: "",
      alertOpacity: "0.75",
      mvpData: mvpAqData,
      isDisplayed: "none",
      nfhlIsDisplayed: "none",
      nfhlServicesAlertDisplayed: "none",
      currentZoom: 4,
      currentBounds: {
        _southWest: {
          lat: {},
          lng: {},
        },
        _northEast: {
          lat: {},
          lng: {},
        },
      },
      nwisIcon: L.divIcon({
        className:
          "wmm-circle wmm-mutedblue wmm-icon-triangle wmm-icon-black wmm-size-20 wmm-borderless",
      }), //custom WIM icons
      pathIcon: L.icon({
        iconUrl: require("../assets/aq-icons/path_flooded_circle.png"),
        iconSize: [50, 50],
      }),
      bankIcon: L.icon({
        iconUrl: require("../assets/aq-icons/embankment_flooded_circle.png"),
        iconSize: [50, 50],
        iconAnchor: [10, 10],
      }),
      roadIcon: L.icon({
        iconUrl: require("../assets/aq-icons/car_flooded_circle.png"),
        iconSize: [50, 50],
        iconAnchor: [30, 30],
      }),
      bfeIcon: L.icon({
        iconUrl: require("../assets/aq-icons/BFE.png"),
        iconSize: [50, 50],
        iconAnchor: [30, 30],
      }),
      bridgeFloodedIcon: L.icon({
        iconUrl: require("../assets/aq-icons/bridge_flooded_circle.png"),
        iconSize: [50, 50],
        iconAnchor: [30, 30],
      }),
      bridgeRiskIcon: L.icon({
        iconUrl: require("../assets/aq-icons/bridge_risk_circle.png"),
        iconSize: [50, 50],
        iconAnchor: [30, 30],
      }),
      buildingIcon: L.icon({
        iconUrl: require("../assets/aq-icons/building_flooded_circle.png"),
        iconSize: [50, 50],
        iconAnchor: [30, 30],
      }),
      otherIcon: L.icon({
        iconUrl: require("../assets/aq-icons/other.png"),
        iconSize: [50, 50],
      }),
      noaaIcon: L.divIcon({ 
        className: 'wmm-diamond wmm-lime wmm-icon-triangle wmm-icon-black wmm-size-15 wmm-borderless', 
      }),
      activeLayerTitleVisible: true,
      bankVisible: false,
      pathVisible: false,
      roadVisible: false,
      bridgeRiskVisible: false,
      bridgeFloodedVisible: false,
      facilityVisible: false,
      otherVisible: false,
      bfeVisible: false,
      sublayerVisibility: false,
      bankLayer: {},
      pathLayer: {},
      roadLayer: {},
      bridgeRiskLayer: {},
      bridgeFloodedLayer: {},
      facilityLayer: {},
      otherLayer: {},
      bfeLayer:{},
      activeSubtypes: [],
      showParagraph: false,
      fillColor: "#ffffff",
      streamgageVisible: false,
      tidesVisible: false,
      allRPVisible: true,
      noFloodingdialog: false,
      thresholdsExceeded: 0,
      mediaQuery: 'screen and (max-width: 767px)'
    };
  },
  methods: {
    createMap() {
      //Set 'this' to self to access it inside map events within method
      let self = this;

      self.map = L.map("map", {
        center: self.center,
        zoom: self.zoom,
        zoomSnap: 0.5,
      });

      // Disable map scrolling when scrolling the legend
      L.DomEvent.disableScrollPropagation(document.querySelector('#legendContainer'));
      // Enable clicking on map controls on mobile screens
      L.DomEvent.disableClickPropagation(document.querySelector('#legendContainer'));
      L.DomEvent.disableClickPropagation(document.querySelector('#findLocationContainer'));

      // Prevent page navigation when swiping right and left in Safari
      document.addEventListener("touchmove" , function(e) {
        e.preventDefault();
      });

      //Add streets tilelayer to map initially
      L.tileLayer(tileProviders[0].url, {
        attribution: tileProviders[0].attribution,
        name: tileProviders[0].name,
      }).addTo(self.map);

      self.streamgageMarkers = L.featureGroup();
      self.tideMarkers = L.layerGroup();

      // Live markers from Aquarius TEST environment
      self.aqMarkers = L.featureGroup();
      self.aqMarkers
        .on("click", function (e) {
          self.openAQPopup(e);
        })
        .addTo(self.map);

      self.pathLayer = L.featureGroup();
      self.pathLayer
        .addTo(self.map);

      self.roadLayer = L.featureGroup();
      self.roadLayer
        .addTo(self.map);

      self.bridgeRiskLayer = L.featureGroup();
      self.bridgeRiskLayer
        .addTo(self.map);

      self.bridgeFloodedLayer = L.featureGroup();
      self.bridgeFloodedLayer
        .addTo(self.map);

      self.bfeLayer = L.featureGroup();
      self.bfeLayer
        .addTo(self.map);

      self.otherLayer = L.featureGroup();
      self.otherLayer
        .addTo(self.map);

      self.facilityLayer = L.featureGroup();
      self.facilityLayer
        .addTo(self.map);

      self.bankLayer = L.featureGroup();
      self.bankLayer
        .addTo(self.map);

      self.streamgageMarkers.on("click", function (e) {
        self.openStreamGagePopup(e);
      });

      let latlngDiv;

      // All markers from Aquarius TEST environment
      self.allRPMarkers = L.featureGroup();
      self.allRPMarkers.on("click", function (e) {
        self.openAQPopup(e);
      })
      .addTo(self.map);

      //Create lat lon leaflet control
      L.Control.LatLngControl = L.Control.extend({
        options: { position: "bottomleft" },
        onAdd: function () {
          latlngDiv = L.DomUtil.create("div", "latlngcontrol");
          latlngDiv.innerHTML =
            "<button>Latitude: " +
            self.lat +
            "<br/><span id='long'>Longitude: " +
            self.lon +
            "</span><br/><span id='zoom'>Current Zoom: " +
            self.currentZoom +
            "</span></button>";
          return latlngDiv;
        },
      });

      L.control.LatLngControl = function (options) {
        return new L.Control.LatLngControl(options);
      };

      L.control.LatLngControl({ position: "bottomleft" }).addTo(self.map);

      //Update lat lng control on mousemove
      self.map.on("mousemove", function (e) {
        if (e.latlng !== null) {
          let mouselat = e.latlng.lat.toFixed(4);
          let mouselon = e.latlng.lng.toFixed(4);
          self.currentZoom = self.map.getZoom();
          latlngDiv.innerHTML =
            "<button>Latitude: " +
            mouselat +
            "<br/><span id='long'>Longitude: " +
            mouselon +
            "</span><br/><span id='zoom'>Current Zoom: " +
            self.currentZoom +
            "</span></button>";
        }
      });

      //Update lat lng control on zoomend
      self.map.on("zoomend", function () {
        self.currentZoom = self.map.getZoom();
        //Zoom value to update state
        self.zoomValue = self.currentZoom;
        document.getElementById("zoom").innerHTML =
          "<span id='zoom'>Current Zoom: " + self.currentZoom + "</span>";
      });

      //Scale control
      L.control
        .scale({ position: "topright", imperial: true, metric: false })
        .addTo(self.map);

      //Update current bounds
      self.map.on("zoomend dragend", function () {
        self.currentBounds = self.map.getBounds();
      });

      // Emit map object to parent component
      self.getMapObject();

      // loading data from Aquarius
      this.loadAQdata();
    },
    // Pass map object to parent
    getMapObject() {
      this.$emit("getMap", this.map);
    },
    // Compare tile provider name to basemap state and add to map
    selectBasemap(tileProviders) {
      let self = this;
      self.tileProviders = tileProviders;
      //Clear all basemaps before adding
      self.map.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
          layer.remove();
        }
      });
      for (let i = 0; i < tileProviders.length; i++) {
        if (self.$store.state.basemapState == tileProviders[i].name) {
          let attribution = tileProviders[i].attribution;
          L.tileLayer(tileProviders[i].url, {
            attribution: attribution,
          }).addTo(self.map);
        }
      }
    },

    // Get streamgage layer
    getData() {
      // Display loading alert
      this.isDisplayed = "block";
      // Clear existing streamgage markers
      this.streamgageMarkers.clearLayers();
      let zoomlevel = this.currentZoom;
      let extent = this.map.getBounds();
      let bbox =
        extent._southWest.lng.toFixed(7) +
        "," +
        extent._southWest.lat.toFixed(7) +
        "," +
        extent._northEast.lng.toFixed(7) +
        "," +
        extent._northEast.lat.toFixed(7);
      let url =
        "https://waterservices.usgs.gov/nwis/site/?format=mapper&bBox=" +
        bbox +
        "&parameterCd=" +
        parameterCodeList +
        "&siteType=" +
        siteTypeList +
        "&siteStatus=" +
        siteStatus;
      axios
        .get(url)
        .then((data) => {
          let domParser = new DOMParser();
          let xmlElement = domParser.parseFromString(data.data, "text/xml");
          let streamGageList = xmlElement.getElementsByTagName("site");
          for (let i = 0; i < streamGageList.length; i++) {
            let lat = parseFloat(streamGageList[i].getAttribute("lat"));
            let lng = parseFloat(streamGageList[i].getAttribute("lng"));
            let siteID = streamGageList[i].getAttribute("sno");
            let siteName = streamGageList[i].getAttribute("sna");
            // Return if zoom level or extent change during loop.  Prevents markers from remaining on map if zoom/extent is changed too quickly
            if (zoomlevel !== this.currentZoom) {
              this.fadeOutAlert();
              return;
            }
            if (this.$store.state.streamgageState == true) {
              let marker = L.marker([lat, lng], {
                icon: this.nwisIcon,
                zIndexOffset: 1000, // add marker on top of other map layers
                opacity: this.$store.state.rtOpacity
              }).addTo(this.streamgageMarkers);
              marker.data = { siteName: siteName, siteCode: siteID };
            }
          }
          this.streamgageMarkers.addTo(this.map);
          // Fade out loading alert
          this.fadeOutAlert();
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 404") {
            console.log("No streamgages found");
          }
          // Fade out loading alert
          this.fadeOutAlert();
        });
    },
    // set streamgage visibility according to checkbox and currentZoom values
    toggleStreamgage(streamgageMarkers, currentZoom) {
      this.streamgageMarkers = streamgageMarkers;
      if (this.$store.state.streamgageState == true && currentZoom >= 9) {
        this.getData();
        this.streamgageVisible = true;
      } else if (this.$store.state.streamgageState == true && currentZoom < 9) {
        this.streamgageMarkers.clearLayers();
        this.streamgageVisible = true;
      } else {
        this.streamgageMarkers.clearLayers();
        this.streamgageVisible = false;
      }
    },
    openStreamGagePopup(e) {
      //Clear out previous popup contents if existing
      if (document.getElementById("mainGraphContainer") != null) {
        document.getElementById("mainGraphContainer").remove();
      }
      if (document.getElementById("graphLoadMessage") != null) {
        document.getElementById("graphLoadMessage").remove();
      }

      if (document.getElementById("popup-title") != null) {
        document.getElementById("popup-title").remove();
      }

      if (document.getElementById("noDataMessage") != null) {
        document.getElementById("noDataMessage").remove();
      }

      document.getElementById('fullscreenPopup').innerHTML = '';

      //popup for Active Flooding
      this.popupContent =
        '<div id="popup-title"><label>NWIS Site ' +
        e.layer.data.siteCode +
        "</br>" +
        e.layer.data.siteName +
        '</label></div><p id="graphLoadMessage"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="mainGraphContainer" style="width:100%; min-height: 200px;display:block;"></div> <div id="dataCredit">Gage Height data courtesy of the U.S. Geological Survey</div><div id="nwisLink"><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        e.layer.data.siteCode +
        '"><b>Site ' +
        e.layer.data.siteCode +
        ' on NWISWeb <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a></div><div id="noDataMessage" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        e.layer.data.siteCode +
        "&parameterCd=" +
        graphParameterCodeList +
        this.timePeriodValue;

      let el;
      let self = this;
      axios.get(url).then((data) => {
        if (
          data.data == undefined ||
          data.data.response_code == 404 ||
          data.data.data[0].time_series_data.length == 0
        ) {
          console.log("No NWIS data available for this time period");
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.popupContent, { minWidth: 300 })
              .openPopup();
          } else {
            e.layer.bindPopup(this.popupContent, { minWidth: 300 }).openPopup();
          }
          if (window.matchMedia(this.mediaQuery).matches){
            el = document.getElementById('fullscreenPopup');
            el.innerHTML += '<div id="popupCloseButton">' +
            '<i class="v-icon notranslate mdi mdi-close" style="font-size:16px"></i>' +
            '</div><br>';
            el.innerHTML += this.popupContent;

            document.querySelector('#popupCloseButton').onclick = function(){
              self.map.closePopup();
              el.innerHTML = '';
              el.classList.remove('visible');
            }

            L.DomEvent.disableClickPropagation(document.querySelector('#popupCloseButton'))
            el.classList.add('visible');
          }
          document
            .getElementById("graphLoadMessage")
            .setAttribute("style", "display: none");
            document
            .getElementById("dataCredit")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessage")
            .setAttribute("style", "display: block");
          document
            .getElementById("mainGraphContainer")
            .setAttribute("style", "display: none");
        } else {
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.popupContent, { minWidth: 300 })
              .openPopup();
          } else {
            e.layer.bindPopup(this.popupContent, { minWidth: 300 }).openPopup();
          }

          if (window.matchMedia(this.mediaQuery).matches){
            el = document.getElementById('fullscreenPopup');
            el.innerHTML += '<div id="popupCloseButton">' +
            '<i class="v-icon notranslate mdi mdi-close" style="font-size:16px"></i>' +
            '</div><br>';
            el.innerHTML += this.popupContent;

            document.querySelector('#popupCloseButton').onclick = function(){
              self.map.closePopup();
              el.innerHTML = '';
              el.classList.remove('visible');
            }

            L.DomEvent.disableClickPropagation(document.querySelector('#popupCloseButton'))
            el.classList.add('visible');
          }

          let dates = [];
          let values = [];
          let plotlyAnnotations = [];

          // Create x and y arrays for NWIS trace
          data.data.data[0].time_series_data.forEach(function (time) {
            dates.push(new Date(time[0]));
            values.push(time[1]);
          });

          // Real-time streamgage chart line
          let traces = [
            {
              x: dates,
              y: values,
              type: "scatter",
              showlegend: false,
              name: "Gage Height",
              hovertemplate: "%{x|%m/%d %I:%M %p}<br>Gage height: %{y} feet<extra></extra>",
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          ];

          // Overall layout of Real-time streamgage chart
          let graphtitle =
            "<b>NWIS Site " +
            e.layer.data.siteCode +
            "<br>" +
            e.layer.data.siteName +
            "</b>";

          let layout = {
            autosize: false,
            width: 310,
            height: 235,
            font: {
              family: "Public Sans, sans-serif",
            },
            yaxis: {
              title: "Gage Height, feet",
              titlefont: { size: 11 },
              automargin: true,
            },
            xaxis: {
              range: [dates[0], dates[dates.length - 1]],
              tickformat: "%d %b %y",
              tickfont: {
                size: 11,
              },
            },
            title: {
              text: graphtitle,
              font: {
                size: 12,
                color: "#333",
              },
              x: 0.05,
              y: -1.0,
            },
            margin: {
              l: 30,
              r: 15,
              t: 35,
              b: 15,

            },
            legend: false,
            annotations: plotlyAnnotations,
            hoverlabel: {
              font: {
                family: "Public Sans, sans-serif",
              },
            },
            modebar: {
              orientation: "h", // Vertical modebar
              remove: "autoscale",
            },
            dragmode: "pan", // Make pan the default active modebar button
          };

          // Make chart responsive and modebar always visible
          let config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          };

          let chartData = [];

          traces.forEach(function (trace) {
            chartData.push(trace);
          });

          // Render plot
          Plotly.newPlot("mainGraphContainer", chartData, layout, config);
          document
            .getElementById("mainGraphContainer")
            .setAttribute("style", "display: block");
          document
            .getElementById("graphLoadMessage")
            .setAttribute("style", "display: none");
          document
            .getElementById("popup-title")
            .setAttribute("style", "display: none");
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    openAQPopup(e) {
      //Clear out previous popup contents if existing
      if (document.getElementById("graphContainerAQ") != null) {
        document.getElementById("graphContainerAQ").remove();
      }
      if (document.getElementById("graphLoadMessageAQ") != null) {
        document.getElementById("graphLoadMessageAQ").remove();
      }

      if (document.getElementById("popup-titleAQ") != null) {
        document.getElementById("popup-titleAQ").remove();
      }

      if (document.getElementById("noDataMessageAQ") != null) {
        document.getElementById("noDataMessageAQ").remove();
      }

      document.getElementById('fullscreenPopup').innerHTML = '';

      if (document.getElementById("aqGraphHeader") != null) {
        document.getElementById("aqGraphHeader").remove();
      }

      // storing layer data and setting site id
      let layerData = e.layer.data;
      let siteID = e.layer.data.LocationIdentifier;

      let thresholds = [];

      // using rp elevation as threshold
      thresholds.push({
        name: layerData.FullName,
        value: layerData.Elevation,
        series: [],
      });

      // creating string for request
      //let timeRange = "&period=P7D";

      let icon;
      let tooltip;
      if (e.layer._icon.outerHTML.split("class")[0] === "<div ") {
        icon =
          '<div id="allRPIcon" style="padding-left:2px !important; margin-top: -15px !important; vertical-align: middle" class="wmm-circle wmm-white wmm-icon-noicon wmm-size-15"></div>';
        tooltip = "<span class='tooltiptextWIMIcon'>" + e.layer.data.Name;
      } else {
        icon =
          e.layer._icon.outerHTML.split("class")[0] +
          'style="margin-left: 2px; width:16px; height: 16px; vertical-align: middle;" alt="" >';

        tooltip = "<span class='tooltiptext'>" + layerData.ThresholdName;
      }

      //Active Flooding popup and all RP popup
      this.aqPopupContent =
        '<div id="aqGraphHeader"><span><label id="popup-titleAQ"></br></label>' +
        layerData.SiteName +
        " </label></span><div class='popupIcon'>" +
        icon +
        tooltip +
        "</span></div></br>" +
        '<a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        siteID +
        '"> <b>NWIS Site ' +
        layerData.LocationIdentifier +
        ' <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a></br>' +
        "<b>Reference Point: </b>" +
        layerData.FullName +
        "</br>" +
        "<b>Elevation Data: </b>" +
        layerData.Elevation +
        " " +
        layerData.Unit +
        "</br>" +
        '</div><p id="graphLoadMessageAQ"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainerAQ" style="width:100%; min-height: 200px; display:block;"></div><div id="waterAlert"><a class="nwis-link" target="_blank" href="https://water.usgs.gov/wateralert/subscribe2/?type_cd=ALL&site_no=' +
        siteID +
        '">Subscribe to Water Alert ' + '<i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></a></span></div> <div id="aqDataCredit">Gage Height data courtesy of the U.S. Geological Survey.</div><div id="noDataMessageAQ" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        siteID +
        "&parameterCd=" +
        graphParameterCodeList +
        this.timePeriodValue;

      let el;
      let self = this;
      axios.get(url).then((data) => {
        if (
          data.data == undefined ||
          data.data.response_code == 404 ||
          data.data.data[0].time_series_data.length == 0
        ) {
          console.log("No NWIS data available for this time period");
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.aqPopupContent, {
                minWidth: 300,
              })
              .openPopup();
          } else {
            e.layer
              .bindPopup(this.aqPopupContent, { minWidth: 300 })
              .openPopup();
          }
          if (window.matchMedia(this.mediaQuery).matches){
            el = document.getElementById('fullscreenPopup');
            el.innerHTML += '<div id="popupCloseButton">' +
            '<i class="v-icon notranslate mdi mdi-close" style="font-size:16px"></i>' +
            '</div><br>';
            el.innerHTML += this.aqPopupContent;

            document.querySelector('#popupCloseButton').onclick = function(){
              self.map.closePopup();
              el.innerHTML = '';
              el.classList.remove('visible');
            }

            L.DomEvent.disableClickPropagation(document.querySelector('#popupCloseButton'))
            el.classList.add('visible');
          }

          document
            .getElementById("graphLoadMessageAQ")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessageAQ")
            .setAttribute("style", "display: block");
          document
            .getElementById("aqDataCredit")
            .setAttribute("style", "display: none");
          document
            .getElementById("graphContainerAQ")
            .setAttribute("style", "display: none");
        } else {
          if (e.layer.getPopup() != undefined) {
            e.layer.getPopup().setContent(this.aqPopupContent, {
              minWidth: 290,
            });
            e.layer.openPopup();
          } else {
            e.layer.bindPopup(this.aqPopupContent, {
              minWidth: 290,
            });
            e.layer.openPopup();
          }

          if (window.matchMedia(this.mediaQuery).matches){
            el = document.getElementById('fullscreenPopup');
            el.innerHTML += '<div id="popupCloseButton">' +
            '<i class="v-icon notranslate mdi mdi-close" style="font-size:16px"></i>' +
            '</div><br>';
            el.innerHTML += this.aqPopupContent;

            document.querySelector('#popupCloseButton').onclick = function(){
              self.map.closePopup();
              el.innerHTML = '';
              el.classList.remove('visible');
            }

            L.DomEvent.disableClickPropagation(document.querySelector('#popupCloseButton'))
            el.classList.add('visible');
          }

          // Associate time info with threshold values
          thresholds.forEach(function (threshold) {
            data.data.data[0].time_series_data.forEach(function (value) {
              threshold.series.push([value[0], threshold.value]);
            });
          });

          let dates = [];
          let values = [];
          let plotlyAnnotations = [];

          let ampm = "AM";
          let mostRecentDate = new Date(data.data.data[0].time_series_data[data.data.data[0].time_series_data.length - 1][0]);
          let hour = mostRecentDate.getHours();
          if(hour > 12){
            hour = hour - 12;
            hour = hour.toString().padStart(2, '0');
            ampm = "PM";
          }
          mostRecentDate = (mostRecentDate.getMonth() + 1) + '/' + mostRecentDate.getDate().toString().padStart(2, '0')  + "/" + mostRecentDate.getFullYear() + " " + hour + ":" + mostRecentDate.getMinutes().toString().padStart(2, '0');
          let mostRecentHeight = data.data.data[0].time_series_data[data.data.data[0].time_series_data.length - 1][1];
          document.getElementById("aqGraphHeader").innerHTML += `<b>Last Updated: </b>${mostRecentDate} ${ampm}<br><b>Last Updated Gage Height: </b>${mostRecentHeight} feet`;
          // Create x and y arrays for NWIS trace
          data.data.data[0].time_series_data.forEach(function (time) {
            dates.push(new Date(time[0]));
            values.push(time[1]);
          });

          // Plot for Active Flooding, label for all RP and Status
          let traces = [
            {
              x: dates,
              y: values,
              type: "scatter",
              showlegend: true,
              name: "<b>NWIS Observed Gage Data</b>",
              hovertemplate: "%{x|%m/%d %I:%M %p}<br>Gage height: %{y} feet<extra></extra>",
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          ];

          // Create trace and annotation for each threshold
          for (let i = 0; i < thresholds.length; i++) {
            let xdata = [];
            let ydata = [];

            // Add one line representing all thresholds to legend
            let showLegend = false;

            if (i == 0) {
              showLegend = true;
            }

            // Create x and y arrays for threshold traces
            thresholds[i].series.forEach(function (datapoint) {
              let xdatapoint = new Date(datapoint[0]);
              xdata.push(xdatapoint);
              ydata.push(datapoint[1]);
            });

            // threshold level for Active Flooding
            traces.push({
              x: xdata,
              y: ydata,
              type: "scatter",
              line: {
                color: "#8b0000",
              },
              showlegend: showLegend,
              legendgroup: "thresholds",
              name: layerData.ThresholdName + " Threshold",
              // Tooltip
              hovertemplate: "%{fullData.name}: %{y} feet<extra></extra>",
              font: {
                family: "Public Sans, sans-serif",
              },
            });

            // Create labels for Active Flooding
            plotlyAnnotations.push({
              x: thresholds[i].series[thresholds[i].series.length - 1][0], // Place label after last x value
              y: ydata[0], // Place label at same y value as threshold
              xref: "x",
              yref: "y",
              text: layerData.Elevation + " " + layerData.Unit,
              showarrow: false,
              arrowhead: 0,
              font: {
                family: "Public Sans, sans-serif",
                size: 9,
              },
              xanchor: "left",
            });
          }

          // Active Flooding chart layout
          let layout = {
            autosize: false,
            width: 300,
            height: 235,
            font: {
              family: "Public Sans, sans-serif",
            },
            yaxis: {
              title: "Gage Height, feet",
              titlefont: { size: 11 },
              automargin: true,
            },
            xaxis: {
              range: [dates[0], dates[dates.length - 1]],
              tickformat: "%d %b %y",
              tickfont: {
                size: 11,
              },
            },
            legend: {
              font: {
                size: 11,
              },
              orientation: "h",
              y: -0.15,
            },
            margin: {
              l: 25,
              r: 25,
              t: 20,
              pad: 4,
            },
            annotations: plotlyAnnotations,
            hoverlabel: {
              font: {
                family: "Public Sans, sans-serif",
              },
            },
            modebar: {
              orientation: "h", // Vertical modebar
              remove: "autoscale",
            },
            dragmode: "pan", // Make pan the default active modebar button
          };

          let config = {
            responsive: true, // Make chart responsive
            displayModeBar: true, // Modebar always visible, not just on plot hover
            displaylogo: false, // Remove plotly.js icon from modebar
          };

          let chartData = [];

          traces.forEach(function (trace) {
            chartData.push(trace);
          });

          // Render plot
          Plotly.newPlot("graphContainerAQ", chartData, layout, config);
          document
            .getElementById("graphContainerAQ")
            .setAttribute("style", "display: block");
          document
            .getElementById("graphLoadMessageAQ")
            .setAttribute("style", "display: none");
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    //Fade out loading alert by reducing opacity
    fadeOutAlert() {
      let opacity = 0.75;
      let self = this;
      let fadeOut = setInterval(function () {
        if (opacity > 0) {
          opacity -= 0.05;
          let opacityValue = String(opacity);
          self.alertOpacity = opacityValue;
        } else {
          self.alertOpacity = "0.75";
          self.isDisplayed = "none";
          clearInterval(fadeOut);
        }
      }, 50);
    },
    nfhlFadeOutAlert() {
      let opacity = 0.75;
      let self = this;
      let fadeOut = setInterval(function () {
        if (opacity > 0 && this.nfhlIsDisplayed === "block") {
          opacity -= 0.05;
          let opacityValue = String(opacity);
          self.alertOpacity = opacityValue;
        } else {
          self.alertOpacity = "0.75";
          self.nfhlIsDisplayed = "none";
          clearInterval(fadeOut);
        }
      }, 100);
    },
    nfhlFadeOutServicesAlert() {
      let opacity = 0.75;
      let self = this;
      let fadeOut = setInterval(function () {
        if (opacity > 0) {
          opacity -= 0.05;
          let opacityValue = String(opacity);
          self.alertOpacity = opacityValue;
        } else {
          self.alertOpacity = "0.75";
          self.nfhlServicesAlertDisplayed = "none";
          clearInterval(fadeOut);
        }
      }, 100);
    },
    loadAQdata() {
      // clearing variables
      this.aqMarkers.clearLayers();
      this.allRPMarkers.clearLayers();
      this.activeSubtypes = [];
      this.bankLayer.clearLayers();
      this.pathLayer.clearLayers();
      this.roadLayer.clearLayers();
      this.bridgeRiskLayer.clearLayers();
      this.bridgeFloodedLayer.clearLayers();
      this.facilityLayer.clearLayers();
      this.otherLayer.clearLayers();
      this.bfeLayer.clearLayers();
      this.bankVisible = false,
      this.pathVisible = false,
      this.roadVisible = false,
      this.bridgeRiskVisible = false,
      this.bridgeFloodedVisible = false,
      this.facilityVisible = false,
      this.otherVisible = false,
      this.bfeVisible = false,
      this.$store.state.bankState = false;
      this.$store.state.pathState = false;
      this.$store.state.roadState = false;
      this.$store.state.bridgeRiskState = false;
      this.$store.state.bridgeState = false;
      this.$store.state.facilityState = false;
      this.$store.state.otherState = false;
      this.$store.state.bfeState = false;
      document.getElementById("bankDiv").style.opacity = 0.6;
      document.getElementById("pathDiv").style.opacity = 0.6;
      document.getElementById("roadDiv").style.opacity = 0.6;
      document.getElementById("bridgeRiskDiv").style.opacity = 0.6;
      document.getElementById("bridgeDiv").style.opacity = 0.6;
      document.getElementById("facilityDiv").style.opacity = 0.6;
      document.getElementById("bfeDiv").style.opacity = 0.6;
      document.getElementById("otherDiv").style.opacity = 0.6;
      let hasMarkers = false;
      let entryCount = 0;
      this.thresholdsExceeded = 0;
      this.activeLayerTitleVisible = false;
      document.getElementById("activeLayerTitle").style.display = "none";
      document.getElementById("noActiveFlooding").style.display = "none";
      document.getElementById("showAllBtn").style.display = "none";

      // adding rp/threshold data from Aquarius
      for (let entry in this.mvpData) {
        let LocationIdentifier;
        let Name;
        let fullname;
        let rpData;
        let elevation;
        let unit;
        let lat;
        let lng;
        let aqIcon;
        let siteName;
        let thresholdName;

        if (this.mvpData[entry].Latitude !== undefined) {
            lat = this.mvpData[entry].Latitude;
            lng = this.mvpData[entry].Longitude;
            fullname = this.mvpData[entry].Name;
            Name = this.mvpData[entry].Name;
            elevation = this.mvpData[entry].Elevation;
            unit = this.mvpData[entry].Unit;
            siteName = this.mvpData[entry].SiteName;
            LocationIdentifier = this.mvpData[entry].LocationIdentifier;
          }
        // Remove any digits from Name string
        Name = Name.replace(/[0-9]/, "");

        // Determine Icon for Reference Point
        if (Name === "PATH") {
          aqIcon = this.pathIcon;
          thresholdName = "Path Flooded";
        } else if (Name === "BANK") {
          aqIcon = this.bankIcon;
          thresholdName = "Bank Flooded";
        } else if (Name === "ROAD") {
          aqIcon = this.roadIcon;
          thresholdName = "Road Flooded";
        } else if (Name === "CHORD") {
          aqIcon = this.bridgeRiskIcon;
          thresholdName = "Bridge Flood Risk";
        } else if (Name === "FACILITY") {
          aqIcon = this.buildingIcon;
          thresholdName = "Facility Flooded";
        } else if (Name === "DECK") {
          aqIcon = this.bridgeFloodedIcon;
          thresholdName = "Bridge Flooded";
        } else if (Name === "BFE") {
          aqIcon = this.bfeIcon;
          thresholdName = "BFE";
        } else {
          aqIcon = this.otherIcon;
          thresholdName = "Uncategorized Flooding";
        }

        var wimIcon = L.divIcon({
          className:
            "wmm-circle wmm-white wmm-icon-noicon wmm-size-30",
        });

        let url =
          "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
          LocationIdentifier +
          "&parameterCd=" +
          graphParameterCodeList +
          this.timePeriodValue;
        axios.get(url).then((data) => {
          if (
            data.data != undefined &&
            data.data.response_code != 404 &&
            data.data.data[0].time_series_data.length != 0 &&
            elevation != undefined
          ) {
            if (
              data.data.data[0].time_series_data[
                data.data.data[0].time_series_data.length - 1
              ][1] >= elevation
            ) {
              let marker;
              // Icon visible in legend
              if (Name === "PATH") {
                this.pathVisible = true;
                this.$store.state.pathState = true;
                document.getElementById("pathDiv").style.opacity = 1;
                this.$store.commit("getPathDisabledState", false);
                if(this.activeSubtypes.includes("path") === false){
                  this.activeSubtypes.push("path");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.pathLayer);
                this.pathLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "BANK") {
                this.bankVisible = true;
                this.$store.state.bankState = true;
                document.getElementById("bankDiv").style.opacity = 1;
                this.$store.commit("getBankDisabledState", false);
                if(this.activeSubtypes.includes("bank") === false){
                  this.activeSubtypes.push("bank");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.bankLayer);
                this.bankLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "ROAD") {
                this.roadVisible = true;
                this.$store.state.roadState = true;
                document.getElementById("roadDiv").style.opacity = 1;
                this.$store.commit("getRoadDisabledState", false);
                if(this.activeSubtypes.includes("road") === false){
                  this.activeSubtypes.push("road");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.roadLayer);
                this.roadLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "CHORD") {
                this.bridgeRiskVisible = true;
                this.$store.state.bridgeRiskState = true;
                document.getElementById("bridgeRiskDiv").style.opacity = 1;
                this.$store.commit("getBridgeRiskDisabledState", false);
                if(this.activeSubtypes.includes("bridgeRisk") === false){
                  this.activeSubtypes.push("bridgeRisk");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.bridgeRiskLayer);
                this.bridgeRiskLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "FACILITY") {
                this.facilityVisible = true;
                this.$store.state.facilityState = true;
                document.getElementById("facilityDiv").style.opacity = 1
                this.$store.commit("getFacilityDisabledState", false);
                if(this.activeSubtypes.includes("facility") === false){
                  this.activeSubtypes.push("facility");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.facilityLayer);
                this.facilityLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "DECK") {
                this.bridgeFloodedVisible = true;
                this.$store.state.bridgeState = true;
                document.getElementById("bridgeDiv").style.opacity = 1;
                this.$store.commit("getBridgeDisabledState", false);
                if(this.activeSubtypes.includes("bridgeFlooded") === false){
                  this.activeSubtypes.push("bridgeFlooded");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.bridgeFloodedLayer);
                this.bridgeFloodedLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else if (Name === "BFE") {
                this.bfeVisible = true;
                this.$store.state.bfeState = true;
                document.getElementById("bfeDiv").style.opacity = 1;
                this.$store.commit("getBfeDisabledState", false);
                if(this.activeSubtypes.includes("bfe") === false){
                  this.activeSubtypes.push("bfe");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.bfeLayer);
                this.bfeLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              } else {
                this.otherVisible = true;
                this.$store.state.otherState = true;
                document.getElementById("otherDiv").style.opacity = 1
                this.$store.commit("getOtherDisabledState", false);
                if(this.activeSubtypes.includes("other") === false){
                  this.activeSubtypes.push("other");
                }
                marker = L.marker([lat, lng], {
                  icon: aqIcon,
                  zIndexOffset: 100
                }).addTo(this.otherLayer);
                this.otherLayer.addTo(this.aqMarkers);
                this.thresholdsExceeded ++;
              }

              marker.data = {
                LocationIdentifier: LocationIdentifier,
                Name: Name,
                ReferencePointPeriods: rpData,
                Elevation: elevation,
                Unit: unit,
                FullName: fullname,
                SiteName: siteName,
                ThresholdName: thresholdName,
                lat: lat,
                lng: lng,
              };
              hasMarkers = true;
              entryCount ++;
            }else{
              // all RP layer
              let allMarkers = L.marker([lat, lng], {
                icon: wimIcon,
                opacity: this.$store.state.allFeaturesOpacity
              }).addTo(this.allRPMarkers);

              allMarkers.data = {
                LocationIdentifier: LocationIdentifier,
                Name: Name,
                ReferencePointPeriods: rpData,
                Elevation: elevation,
                Unit: unit,
                FullName: fullname,
                SiteName: siteName,
                ThresholdName: thresholdName,
                lat: lat,
                lng: lng,
              };
              entryCount ++;
              // end all RP Layer
              // Wait for last entry to add markers to map and fit bounds, otherwise bounds will be invalid
              if (hasMarkers && entryCount == this.mvpData.length) {
                this.aqMarkers.addTo(this.map);
                this.map.fitBounds(this.aqMarkers.getBounds());
                document.getElementById("activeLayerTitle").style.display = "block";
                document.getElementById("showAllBtn").style.display = "flex";
                this.$store.commit("getThresholdsExceededCount", this.thresholdsExceeded);
              } else if (!hasMarkers && entryCount == this.mvpData.length) {
                this.noFloodingdialog = true;
                // Remove active flooding titles in legend and display No Active Flooding
                this.activeLayerTitleVisible = false;
                document.getElementById("noActiveFlooding").style.display = "block";
                this.$store.commit("getThresholdsExceededCount", this.thresholdsExceeded);
                this.map.setView(this.center, 4) 
              }
            }
          }else{
            // all RP layer
              let allMarkers = L.marker([lat, lng], {
                icon: wimIcon,
                opacity: this.$store.state.allFeaturesOpacity
              }).addTo(this.allRPMarkers);

              allMarkers.data = {
                LocationIdentifier: LocationIdentifier,
                Name: Name,
                ReferencePointPeriods: rpData,
                Elevation: elevation,
                Unit: unit,
                FullName: fullname,
                SiteName: siteName,
                ThresholdName: thresholdName,
                lat: lat,
                lng: lng,
              };
              entryCount ++;
              // end all RP Layer
          }
        })
        .catch(function(error){
          console.log(error);
        });
      }
    },
    toggleNfhl(nfhlLayer) {
      let container = document.getElementById("nfhlLegend");
      this.nfhlLayer = nfhlLayer;
      if (this.$store.state.nfhlState == true) {
        this.nfhlVisible = true;
        this.getNfhlLayer();
      } else {
        this.nfhlLayer.remove();
        this.nfhlVisible = false;
        if (container != null) {
          container.style.display = "none";
        }
          this.nfhlFadeOutAlert();
      }
    },
    toggleAllRP() {
      let container = document.getElementById("allRPLegend");
      if (this.$store.state.allRPState == true) {
        this.allRPVisible = true;
        this.getallRPLayer();
      } else {
        this.allRPMarkers.remove();
        this.allRPVisible = false;
        if (container != null) {
          container.style.display = "none";
        }
      }
    },
    getNOAATidesLayer(){
      let noaaURL = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json'
      let self = this;
      axios.get(noaaURL)
      .then(function (results) {
          self.addNOAAMarkers(results.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
      })
    },
    //get lat/lng for each NOAA station and add to tideMarkers layer group from siteService
    addNOAAMarkers(stationList) {
        if (stationList.count > 0 && stationList.stations !== undefined) {
            let stations = stationList.stations
            for (let station of stations) {
                let lat = Number(station.lat);
                let long = Number(station.lng);
                let stationId = station.id;
                let beginDate;
                let endDate;
                if(this.timePeriodValue === "&period=P7D"){
                  endDate = new Date();
                  beginDate = new Date();
                  beginDate.setDate(beginDate.getDate() - 7);
                  endDate = endDate.getFullYear().toString() + (endDate.getMonth() + 1).toString().padStart(2, '0') + endDate.getDate().toString().padStart(2, '0');
                  beginDate = beginDate.getFullYear().toString() + (beginDate.getMonth() + 1).toString().padStart(2, '0') + beginDate.getDate().toString().padStart(2, '0');
                }else{
                  beginDate = this.timePeriodValue.split(/[=&]/);
                  beginDate = beginDate[3].replace(/-/g, "");
                  endDate = this.timePeriodValue.substr(this.timePeriodValue.length - 10);
                  endDate = endDate.replace(/-/g, "");
                }
                let gageUrl =
                "https://tidesandcurrents.noaa.gov/waterlevels.html?id=" +
                stationId +
                "&units=standard&bdate=" +
                beginDate +
                "&edate=" +
                endDate +
                "&timezone=GMT&datum=MLLW&interval=6&action=";
                //create popup with link to NOAA graph
                let popupContent =
                '<span><a class="noaa-link" target="_blank" href=' +
                gageUrl +
                ">Graph of Observed Water Levels at site " +
                stationId +
                "</a></span>";
                if (isNaN(lat) || isNaN(long)) {
                    console.log(
                        'Skipped station ' +
                        station.id +
                        ' in NOAA Station layer due to null lat/lng'
                );
                } else {
                    //These sites are in the Atlantic Ocean or otherwise clearly out of place
                    L.marker([lat, long], { icon: this.noaaIcon, opacity: this.$store.state.noaaOpacity })
                      .bindPopup(popupContent)
                      .addTo(this.tideMarkers);
                    this.tideMarkers.addTo(this.map);
                }
            }
        }else{
            console.log("No NOAA stations returned")
        }
    },
    getNfhlLayer() {
      var self = this;
      // let zoomlevel = self.currentZoom;
      let nfhlURL = "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer"
      let extent = this.map.getBounds();
      let bbox =
        extent._southWest.lng.toFixed(7) +
        "%2C" +
        extent._southWest.lat.toFixed(7) +
        "%2C" +
        extent._northEast.lng.toFixed(7) +
        "%2C" +
        extent._northEast.lat.toFixed(7);


      this.nfhlLayer = esri.dynamicMapLayer({
        url: nfhlURL,
        // 0: NFHL Availability, 3: FIRM Panels, 14: Cross Sections, 27: Flood Hazard Boundaries, 28: Flood Hazard Zones
        layers: [0, 3, 14, 27, 28],
        f: "image/png",
      });
      self.nfhlIsDisplayed = "block";
      axios.get(nfhlURL + "/export?bbox=" + bbox + "&size=1421%2C375&dpi=96&format=png32&transparent=true&bboxSR=3857&imageSR=3857&layers=show%3A0%2C3%2C14%2C27%2C28&f=image", {timeout: 30000})
        .then(function () {
          if(self.nfhlIsDisplayed != "none"){
            self.nfhlLayer.addTo(self.map);
            self.nfhlLayer.setOpacity(self.$store.state.nfhlOpacity);
            let layers = self.nfhlLayer.getLayers();
            self.getNfhlLegend(layers);
          }
          self.nfhlFadeOutAlert();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          // Fade out loading alert
          self.nfhlFadeOutAlert();
          // Wait until loading alert fades out to display services error
          setTimeout(function(){
              self.nfhlServicesAlertDisplayed = "block";
              setTimeout(function(){
                  // Wait 4 seconds and then fade out services error
                  self.nfhlFadeOutServicesAlert();
              }, 4000);
          }, 2000);
      })
    },
    getallRPLayer() {
      this.allRPMarkers.addTo(this.map);
    },
    getNfhlLegend(layers) {
      let zoomlevel = this.currentZoom;
      let self = this;
      let container = document.getElementById("nfhlLegend");
      while (document.getElementsByClassName("nfhlLegendComponent")[0]) {
        document.getElementsByClassName("nfhlLegendComponent")[0].remove();
      }
      axios
        .get(
          "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/legend?f=pjson"
        )
        .then((data) => {
          let layerList = data.data.layers;
          for (let i = 0; i < layerList.length; i++) {
            layers.forEach((layer) => {
               if (zoomlevel !== self.currentZoom) {
                  return;
              }
              if (layerList[i].layerId == layer) {
                // Create sublayer legend div
                let legendEl = document.createElement("div", container);
                legendEl.className = "nfhlLegendComponent";
                let layerName;
                // Use the legend label if existing, otherwise use the layer name
                if (layerList[i].legend[0].label != "") {
                  layerName = layerList[i].legend[0].label;
                } else {
                  layerName = layerList[i].layerName;
                }
                // Set innerHTML to image and layer name
                legendEl.innerHTML =
                  "<img src=data:" +
                  layerList[i].legend[0].contentType +
                  ";base64," +
                  layerList[i].legend[0].imageData +
                  " alt=''/><label>" +
                  layerName +
                  "</label>";
                // Add to legend at correct zoom level
                if (container != null) {
                  if (
                    this.currentZoom <= 11 &&
                    layerName == "NFHL Data Available"
                  ) {
                    container.appendChild(legendEl);
                  } else if (
                    this.currentZoom >= 14 &&
                    (layerName == "FIRM Panels" ||
                      layerName == "Limit Lines" ||
                      layerName == "1% Annual Chance Flood Hazard")
                  ) {
                    container.appendChild(legendEl);
                  } else if (
                    this.currentZoom >= 15 &&
                    layerName == "Cross-Sections"
                  ) {
                    container.appendChild(legendEl);
                  }
                  container.style.display = "inline-block";
                } else {
                  // If layer is toggled before legend is expanded, the container element will be null
                  // Need to call the function again when the legend is expanded
                  document.getElementById("titleContainer").onclick =
                    function () {
                      let currentLayers = self.nfhlLayer.getLayers();
                      self.getNfhlLegend(currentLayers);
                      // Remove the callback function
                      document.getElementById("titleContainer").onclick = "";
                    };
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleFww(fwwLayer) {
      let container = document.getElementById("fwwLegend");
      this.fwwLayer = fwwLayer;
      if (this.$store.state.fwwState == true) {
        this.fwwVisible = true;
        this.getFwwLayer();
      } else {
        this.fwwLayer.remove();
        this.fwwVisible = false;
        if (container != null) {
          container.style.display = "none";
        }
      }
    },
    toggleNoaa(noaaLayer) {
      this.tideMarkers = noaaLayer;
      if (this.$store.state.noaaState == true) {
        this.tidesVisible = true;
        this.getNOAATidesLayer();
      } else {
        this.tideMarkers.remove();
        this.tidesVisible = false;
      }
    },
    toggleRadar(radarLayer) {
      let container = document.getElementById("radarLegend");
      this.radarLayer = radarLayer;
      if (this.$store.state.radarState == true) {
        this.radarVisible = true;
        this.getRadarLayer();
      } else {
        this.radarLayer.remove();
        this.radarVisible = false;
        if (container != null) {
          container.style.display = "none";
        }
      }
    },
    getFwwLayer() {
      this.fwwLayer = esri.dynamicMapLayer({
        url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",
        layers: [1],
        f: "image/png",
        opacity: 0.65,
      });
      let layers = this.fwwLayer.getLayers();
      this.fwwLayer.addTo(this.map);
      this.getFwwLegend(layers);
      this.fwwLayer.setOpacity(this.$store.state.fwwOpacity);
    },
    getRadarLayer() {
      this.radarLayer = esri.dynamicMapLayer({
        url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
        layers: [3],
        f: "image/png",
        opacity: 0.65,
      });
      this.radarLayer.addTo(this.map);
      this.radarLayer.setOpacity(this.$store.state.nwsOpacity);
    },
    toggleSublayers(sublayer, sublayerState, sublayerType) {
      if (sublayerState == true) {
        setVisibility(true, this);
        this.disableShowAll();
        sublayer.addTo(this.map);
      } else {
        this.$store.state.showAllDisabled = false;
        sublayer.remove();
        setVisibility(false, this);
      }
      function setVisibility(visible, self){
        switch (sublayerType){
          case 'bank': 
            self.bankVisible = visible; 
            break;
          case 'path': 
            self.pathVisible = visible;
            break;
          case 'road': 
            self.roadVisible = visible;
            break;
          case 'bridgeRisk': 
            self.bridgeRiskVisible = visible;
            break;
          case 'bridgeFlooded': 
            self.bridgeFloodedVisible = visible;
            break;
          case 'facility': 
            self.facilityVisible = visible;
            break;
          case 'bfe': 
            self.bfeVisible = visible;
            break;
          case 'other': 
            self.otherVisible = visible;
            break;
        }
        if (!self.bankVisible && !self.pathVisible && !self.roadVisible && !self.bridgeRiskVisible && !self.bridgeFloodedVisible && !self.facilityVisible && !self.bfeVisible && !self.otherVisible){
          self.activeLayerTitleVisible = false;
        }
        else{
          self.activeLayerTitleVisible = true;
        }
      }
    },
    disableShowAll(){
      let numChecked = 0;
      this.activeSubtypes.forEach((sublayerType) => {
        switch (sublayerType){
          case 'bank': 
            if(this.bankVisible === true && this.$store.state.bankState === true){
              numChecked ++;
            } 
            break;
          case 'path': 
            if(this.pathVisible === true && this.$store.state.pathState === true){
              numChecked ++;
            }
            break;
          case 'road': 
            if(this.roadVisible === true && this.$store.state.roadState === true){
              numChecked ++;
            }
            break;
          case 'bridgeRisk': 
            if(this.bridgeRiskVisible === true && this.$store.state.bridgeRiskState === true){
              numChecked ++;
            }
            break;
          case 'bridgeFlooded': 
            if(this.bridgeFloodedVisible === true && this.$store.state.bridgeState === true){
              numChecked ++;
            }
            break;
          case 'facility': 
            if(this.facilityVisible === true && this.$store.state.facilityState === true){
              numChecked ++;
            }
            break;
          case 'bfe': 
            if(this.bfeVisible === true && this.$store.state.bfeState === true){
              numChecked ++;
            }
            break;
          case 'other': 
            if(this.otherVisible === true && this.$store.state.otherState === true){
              numChecked ++;
            }
            break;
        }
      });
      if(numChecked == this.activeSubtypes.length){
        this.$store.state.showAllDisabled = true;
      }
    },
    showAll(){
      this.$store.state.showAllDisabled = true;
      this.activeSubtypes.forEach((sublayerType) => {
        switch (sublayerType){
          case 'bank': 
            this.bankVisible = true;
            this.$store.state.bankState = true;
            break;
          case 'path': 
            this.pathVisible = true;
            this.$store.state.pathState = true;
            break;
          case 'road': 
            this.roadVisible = true;
            this.$store.state.roadState = true;
            break;
          case 'bridgeRisk': 
            this.bridgeRiskVisible = true;
            this.$store.state.bridgeRiskState = true;
            break;
          case 'bridgeFlooded': 
            this.bridgeFloodedVisible = true;
            this.$store.state.bridgeState = true;
            break;
          case 'facility': 
            this.facilityVisible = true;
            this.$store.state.facilityState = true;
            break;
          case 'bfe': 
            this.bfeVisible = true;
            this.$store.state.bfeState = true;
            break;
          case 'other': 
            this.otherVisible = true;
            this.$store.state.otherState = true;
            break;
        }
      });
    },
    getFwwLegend(layers) {
      let self = this;
      let container = document.getElementById("fwwLegend");
      while (document.getElementsByClassName("fwwLegendComponent")[0]) {
        document.getElementsByClassName("fwwLegendComponent")[0].remove();
      }
      axios
        .get(
          "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/legend?f=pjson"
        )
        .then((data) => {
          let layerList = data.data.layers;
          for (let i = 0; i < layerList[1].legend.length; i++) {
            layers.forEach((layer) => {
              if (layerList[1].layerId == layer) {
                // Create sublayer legend div
                let legendEl = document.createElement("div", container);
                legendEl.className = "fwwLegendComponent";
                let layerName;
                // Use the legend label if existing, otherwise use the layer name
                if (layerList[1].legend[i].label != "") {
                  layerName = layerList[1].legend[i].label;
                } else {
                  layerName = layerList[1].layerName;
                }
                // Set innerHTML to image and layer name
                legendEl.innerHTML =
                  "<img src=data:" +
                  layerList[1].legend[i].contentType +
                  ";base64," +
                  layerList[1].legend[i].imageData +
                  " alt=''/><label>" +
                  layerName +
                  "</label>";
                if (container != null) {
                   {
                    container.appendChild(legendEl);
                  }
                  container.style.display = "inline-block";
                } else {
                  // If layer is toggled before legend is expanded, the container element will be null
                  // Need to call the function again when the legend is expanded
                  document.getElementById("titleContainer").onclick =
                    function () {
                      let currentLayers = self.fwwLayer.getLayers();
                      self.getFwwLegend(currentLayers);
                      // Remove the callback function
                      document.getElementById("titleContainer").onclick = "";
                    };
                }
              }
            });
          }
        });
    },
  },
  mounted() {
    this.createMap();
    let self = this;
    eventBus.$on('showAll', function(){
      self.showAll();
    })
  },
  // Get streamgage data when current bounds change or streamgage checkbox is checked
  watch: {
    currentBounds: function () {
      this.streamgageMarkers.clearLayers();
      this.toggleStreamgage(this.streamgageMarkers, this.currentZoom);
    if (this.map.hasLayer(this.nfhlLayer) && this.nfhlVisible) {
      this.nfhlLayer.remove();
      this.toggleNfhl(this.nfhlLayer);
      }
    },
    currentZoom: function () {
      // Update legend on zoom
      if (this.map.hasLayer(this.nfhlLayer) && this.nfhlVisible) {
        this.nfhlLegendComponent.remove();
        let layers = this.nfhlLayer.getLayers();
        this.getNfhlLegend(layers);
      }
    },
    "$store.state.streamgageState": function () {
      this.toggleStreamgage(this.streamgageMarkers, this.currentZoom);
    },
    "$store.state.bankState": function () {
      this.toggleSublayers(this.bankLayer, this.$store.state.bankState, "bank");
    },
    "$store.state.pathState": function () {
      this.toggleSublayers(this.pathLayer, this.$store.state.pathState, "path");
    },
    "$store.state.roadState": function () {
      this.toggleSublayers(this.roadLayer, this.$store.state.roadState, "road");
    },
    "$store.state.bridgeRiskState": function () {
      this.toggleSublayers(this.bridgeRiskLayer, this.$store.state.bridgeRiskState, "bridgeRisk");
    },
    "$store.state.bridgeState": function () {
      this.toggleSublayers(this.bridgeFloodedLayer, this.$store.state.bridgeState, "bridgeFlooded");
    },
    "$store.state.facilityState": function () {
      this.toggleSublayers(this.facilityLayer, this.$store.state.facilityState, "facility");
    },
    "$store.state.bfeState": function () {
      this.toggleSublayers(this.bfeLayer, this.$store.state.bfeState, "bfe");
    },
    "$store.state.otherState": function () {
      this.toggleSublayers(this.otherLayer, this.$store.state.otherState, "other");
    },
    "$store.state.fwwState": function () {
      this.toggleFww(this.fwwLayer);
    },
    "$store.state.noaaState": function () {
      this.toggleNoaa(this.tideMarkers);
    },
    "$store.state.nfhlState": function () {
      this.toggleNfhl(this.nfhlLayer);
    },
    // Watch basemap state and update visibility when state changes
    "$store.state.basemapState": function () {
      this.selectBasemap(this.tileProviders);
    },
    "$store.state.radarState": function () {
      this.toggleRadar(this.radarLayer);
    },
    "$store.state.allRPState": function () {
      this.toggleAllRP(this.allRPMarkers);
    },
    "$store.state.selectedTimePeriodState": function () {
      this.loadAQdata();
      // If visible, update NOAA layer with new time period
      if (this.tidesVisible){
        this.getNOAATidesLayer();
      }

    },
    "$store.state.rtOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.streamgageMarkers)){
        this.streamgageMarkers.eachLayer(function(marker) {
          marker.setOpacity(self.$store.state.rtOpacity)
        });
      }
    },
    "$store.state.allFeaturesOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.allRPMarkers)){
        this.allRPMarkers.eachLayer(function(marker) {
          marker.setOpacity(self.$store.state.allFeaturesOpacity)
        });
      }
    },
    "$store.state.noaaOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.tideMarkers)){
        this.tideMarkers.eachLayer(function(marker) {
          marker.setOpacity(self.$store.state.noaaOpacity)
        });
      }
    },
    "$store.state.nfhlOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.nfhlLayer)){
        this.nfhlLayer.setOpacity(self.$store.state.nfhlOpacity);
      }
    },
    "$store.state.nwsOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.radarLayer)){
        this.radarLayer.setOpacity(self.$store.state.nwsOpacity)
      }
    },
    "$store.state.fwwOpacity": function () {
      let self = this;
      if(this.map.hasLayer(this.fwwLayer)){
        this.fwwLayer.setOpacity(self.$store.state.fwwOpacity);
      }
    },
  },
  // Store current zoom value in state to access from other components
  computed: {
    zoomValue: {
      get() {
        return this.$store.state.currentZoomState;
      },
      set(value) {
        return this.$store.commit("getCurrentZoomState", value);
      },
    },
    timePeriodValue: {
      get() {
        return this.$store.state.selectedTimePeriodState;
      }
    },
  },
};
</script>

<style>
/*placing "scoped" after style affects only the current file*/
@import "../styles/markers.css";
#map {
  height: 100%;
  width: 100%;
  font-family: "Public Sans", sans-serif;
  /* Set z-index so sidebar appears above map on mobile */
  z-index: 1;
}

#fullscreenPopup {
  height: 100%;
  width: 100%;
  display: none;
  z-index: 9999;
}

#legendContainer {
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 3px 6px rgba(30, 39, 50, 0.2), 0 3px 6px rgba(30, 39, 50, 0.2);
  right: 10px;
  top: 45px;
  height: auto;
  width: 255px;
  position: absolute;
  z-index: 999;
  font-size: 14px;
  opacity: 0.75;
}

#findLocationContainer {
  border-radius: 5px 5px 5px 5px;
  left: 60px;
  top: 15px;
  height: auto;
  width: 210px;
  position: absolute;
  z-index: 999;
  font-size: 14px;
}

#legendExplanation {
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

#thresholdLayersTitle {
  font-size: 16px;
  color: #333;
  padding-left: 8px;
  padding-top: 8px;
}

.legendIcon {
  display: inline-block;
  position: relative;
  margin: 8px;
  line-height: 24px;
  height: 24px;
}

.legendIcon img {
  vertical-align: middle;
}

.legendIcon div {
  vertical-align: middle;
  label {
    display: inline-block;
    -webkit-justify-content: center;
    justify-content: center;
    padding-left: 5px;
  }
}

.legendIcon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 4px;
  padding-right: 2px;
}

.legendIconToggle {
  display: inline-block;
  position: relative;
  margin: 10px;
  padding-left: 10px;
  line-height: 24px;
  height: 24px;
}

.legendIconToggle label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 20px;
}

.latlngcontrol button {
  background-color: #eceef3;
  border-radius: 0;
  border: none;
  box-shadow: 0 3px 6px rgba(30, 39, 50, 0.2), 0 3px 6px rgba(30, 39, 50, 0.2);
  color: #333;
  font-size: 9pt;
  letter-spacing: 1px;
  padding: 5px;
}

.nwisAlertClass, .nfhlAlertClass {
  position: absolute;
  bottom: 22px;
  right: 10px;
  z-index: 2;
  color: #333;
  background-color: #0089e5;
  border: 1px solid #205493;
  border-radius: 2px;
  opacity: 0.75;
  font-weight: bold;
  vertical-align: middle;
  padding: 6px;
}

.nfhlServicesAlertClass {
  position: absolute;
  bottom: 22px;
  right: 10px;
  z-index: 2;
  color: #333;
  background-color: #E78587;
  border: 1px solid #205493;
  border-radius: 2px;
  opacity: 0.75;
  font-weight: bold;
  vertical-align: middle;
  padding: 6px;
}

.loadingLabel {
  padding-left: 5px;
  font-size: 12px;
}

.nwis-link {
  text-decoration: none !important;
}

.noaa-link {
  text-decoration: none !important;
}

#popup-title {
  font-size: 12px;
  color: rgba(51, 51, 51, 0.6);
  font-family: "Public Sans", sans-serif;
  font-weight: bold;
}

#dataCredit {
  font-size: 10px;
}

#aqGraphHeader {
  font-size: 11px;
  font-family: "Public Sans", sans-serif;
}

#aqDataCredit {
  font-size: 10px;
}

#popup-titleAQ {
  font-size: 12px;
}

#nfhlLabel,
#fwwLabel,
#radarLabel {
  margin: 0px;
  padding: 0px;
}

#nfhlLegend,
#fwwLegend,
#radarLegend {
  display: none;
  margin: 0px;
}

.nfhlLegendComponent,
.fwwLegendComponent,
.radarLegendComponent {
  margin-left: 20px;
  padding: 5px;
}

.nfhlLegendComponent,
.fwwLegendComponent {
  margin-bottom: -10px !important;
}

.nfhlLegendComponent label,
.fwwLegendComponent label,
.radarLegendComponent label {
  padding: 5px;
}

.nfhlLegendComponent img,
.fwwLegendComponent img {
  vertical-align: middle;
}

.legendtext {
  font-weight: bold;
}

/* popup icon container for tooltip */
.popupIcon {
  position: relative;
  display: inline-block;
}

/* popup icon tooltip text */
.popupIcon .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgb(31, 119, 180);
  color: #fff;
  text-align: center;
  padding: 2px 0;
  position: absolute;
  z-index: 1;
  left: 120%;
  opacity: 0;
  transition: opacity 0.3s;
}
.popupIcon .tooltiptextWIMIcon {
  visibility: hidden;
  width: 120px;
  background-color: rgb(31, 119, 180);
  color: #fff;
  text-align: center;
  padding: 2px 0;
  position: absolute;
  z-index: 1;
  margin-top: -20px;
  left: 100%;
  margin-left: 30px;
  opacity: 0;
  transition: opacity 0.3s;
}

/* popup icon tooltip arrow */
.popupIcon .tooltiptext::after {
  content: "";
  position: absolute;
  top: 25%;
  right: 100%;
  border-width: 5px;
  border-style: solid;
  border-color: transparent rgb(31, 119, 180) transparent transparent;
}
.popupIcon .tooltiptextWIMIcon::after {
  content: "";
  position: absolute;
  top: 30%;
  right: 100%;
  border-width: 5px;
  border-style: solid;
  border-color: transparent rgb(31, 119, 180) transparent transparent;
}

/* show popup icon tooltip on hover */
.popupIcon:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.popupIcon:hover .tooltiptextWIMIcon {
  visibility: visible;
  opacity: 1;
}

.v-dialog > .v-card > .v-card__text {
  padding: 20px !important;
}

#mainGraphContainer {
  padding-top: 18px;
}

#legendContent {
  max-height: 65vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.v-expansion-panel-content__wrap {
  padding: 0 15px 16px !important;
}

@media screen and (max-width: 828px) {
  #legendExplanation {
    display: none;
  }
  #legendExplanationMobile {
    display: block;
    text-align: center;
  }
  #legendContainer {
    width: auto;
  }
  #titleContainer {
    padding: 8px 12px;
  }
  .v-expansion-panel--active {
    width: 225px !important;
  }
}

@media screen and (max-width: 767px) {
  #fullscreenPopup.visible {
    display: block;
  }

  #popupCloseButton {
    float: right;
  }

  #aqGraphHeader {
    margin: auto;
    width: 85%;
  }

  #graphContainerAQ {
    margin: auto;
    width: 85%;
  }

  #waterAlert {
    margin: auto;
    width: 85%;
  }

  #aqDataCredit {
    margin: auto;
    width: 85%;
  }

  #dataCredit {
    margin: auto;
    width: 85%;
  }

  #mainGraphContainer {
    margin: auto;
    width: 95%;
  }

  #nwisLink {
    margin: auto;
    width: 85%;
  }

  #popup-title {
    margin: auto;
    width: 85%;
  }

  #noDataMessage {
    margin: auto;
    width: 85%;
  }
}

@media screen and (min-width: 828px) {
  #legendExplanation {
    display: block;
  }
  #legendExplanationMobile {
    display: none;
  }
}

</style>
