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
          :size="20"
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
          :size="20"
        ></v-progress-circular>
        <span class="loadingLabel">Loading Layer...</span>
      </div>

      <!-- a leaflet map -->
      <div id="map">
        <!-- Legend -->
        <v-expansion-panels id="legendContainer">
          <v-expansion-panel>
            <!-- Legend title -->
            <v-expansion-panel-header id="titleContainer">
              <div id="legendExplanation">Legend</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Toggleable layers -->
              <div id="toggleableLayers">
                <div class="legendIcon" v-if="allRPVisible">
                  <div
                    id="allRPLegend"
                    class="
                      wmm-pin
                      wmm-altblue
                      wmm-icon-noicon
                      wmm-icon-orange
                      wmm-size-20
                    "
                  ></div>
                  <label style="margin-left: 10px"
                    >All Reference Point Locations</label
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
                  <label>Real-time Streamgage</label>
                </div>
                <div class="legendIconToggle" v-if="fwwVisible">
                  <label id="fwwLabel">Flood Watches and Warnings</label>
                </div>
                <div id="fwwLegend"></div>
                <div class="legendIconToggle" v-if="radarVisible">
                  <label id="radarLabel">National Weather Service Radar</label>
                  <div id="radarLegend"></div>
                </div>
                <div class="legendIconToggle" v-if="nfhlVisible">
                  <label id="nfhlLabel">National Flood Hazard Layer</label>
                </div>
                <div id="nfhlLegend"></div>
              </div>
              <!-- Threshold icons -->
              <div id="thresholdLayers">
                <div id="thresholdLayersTitle">Active Flooding</div>
                <div class="legendIcon" v-if="bankVisible">
                  <img
                    src="../assets/aq-icons/embankment_flooded_circle.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Embankment Flooded</label>
                </div>
                <div class="legendIcon" v-if="pathVisible">
                  <img
                    src="../assets/aq-icons/path_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Path Flooded</label>
                </div>
                <div class="legendIcon" v-if="roadVisible">
                  <img
                    src="../assets/aq-icons/car_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Road Flooded</label>
                </div>
                <div class="legendIcon" v-if="bridgeRiskVisible">
                  <img
                    src="../assets/aq-icons/bridge_risk_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flood at Risk</label>
                </div>
                <div class="legendIcon" v-if="bridgeFloodedVisible">
                  <img
                    src="../assets/aq-icons/bridge_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flooded</label>
                </div>
                <div class="legendIcon" v-if="facilityVisible">
                  <img
                    src="../assets/aq-icons/building_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Facility Flooded</label>
                </div>
                <div class="legendIcon" v-if="bfeVisible">
                  <img
                    src="../assets/aq-icons/BFE.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Base Flood Elevation</label>
                </div>
                <div class="legendIcon" v-if="otherVisible">
                  <img
                    src="../assets/aq-icons/other.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Uncategorized</label>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <v-dialog v-model="noFloodingdialog" max-width="250">
      <v-card>
        <v-card-title class="text-h6 green lighten-2">
          No active flooding
        </v-card-title>

        <v-card-text> View all reference point locations </v-card-text>

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
import axios from "axios";
import Plotly from "plotly.js";

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
let timeQueryRange = "&period=P7D";

export default {
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
      bankVisible: false,
      pathVisible: false,
      roadVisible: false,
      bridgeRiskVisible: false,
      bridgeFloodedVisible: false,
      facilityVisible: false,
      otherVisible: false,
      bfeVisible: false,
      showParagraph: false,
      fillColor: "#ffffff",
      streamgageVisible: false,
      allRPVisible: true,
      noFloodingdialog: false,
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

      //Add streets tilelayer to map initially
      L.tileLayer(tileProviders[0].url, {
        attribution: tileProviders[0].attribution,
        name: tileProviders[0].name,
      }).addTo(self.map);

      self.streamgageMarkers = L.featureGroup();

      // Live markers from Aquarius TEST environment
      self.aqMarkers = L.featureGroup();
      self.aqMarkers
        .on("click", function (e) {
          self.openAQPopup(e);
        })
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
            ", Longitude: " +
            self.lon +
            "<br/><span id='zoom'>Current Zoom: " +
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
            ", Longitude: " +
            mouselon +
            "<br/><span id='zoom'>Current Zoom: " +
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
                zIndexOffset: 100, // add marker on top of other map layers
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

      //popup for Active Flooding
      this.popupContent =
        '<label id="popup-title">NWIS Site ' +
        e.layer.data.siteCode +
        "</br>" +
        e.layer.data.siteName +
        '</label><p id="graphLoadMessage"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="mainGraphContainer" style="width:100%; min-height: 350px;display:block;"></div> <div id="dataCredit">Gage Height data courtesy of the U.S. Geological Survey</div><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        e.layer.data.siteCode +
        '"><b>Site ' +
        e.layer.data.siteCode +
        ' on NWISWeb <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a><div id="noDataMessage" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        e.layer.data.siteCode +
        "&parameterCd=" +
        graphParameterCodeList +
        timeQueryRange;

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
              hovertemplate: "%{x}<br>Gage height: %{y} feet<extra></extra>",
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

      // storing layer data and setting site id
      let layerData = e.layer.data;
      let sc = e.layer.data.LocationIdentifier;

      let thresholds = [];

      // using rp elevation as threshold
      thresholds.push({
        name: layerData.FullName,
        value: layerData.Elevation,
        series: [],
      });

      // creating string for request
      let timeRange = "&period=P7D";

      let icon;
      let tooltip;
      if (e.layer._icon.outerHTML.split("class")[0] === "<div ") {
        icon =
          '<div id="allRPIcon" style="padding-left:2px !important; margin-top: -15px !important; vertical-align: middle" class="wmm-pin wmm-altblue wmm-icon-noicon wmm-icon-orange wmm-size-15"></div>';
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
        sc +
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
        '</div><p id="graphLoadMessageAQ"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainerAQ" style="width:100%; min-height: 400px; display:block;"></div> <div id="aqDataCredit">Gage Height data courtesy of the U.S. Geological Survey.</div><div id="noDataMessageAQ" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        sc +
        "&parameterCd=" +
        graphParameterCodeList +
        timeRange;
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

          // Associate time info with threshold values
          thresholds.forEach(function (threshold) {
            data.data.data[0].time_series_data.forEach(function (value) {
              threshold.series.push([value[0], threshold.value]);
            });
          });

          let dates = [];
          let values = [];
          let plotlyAnnotations = [];

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
              hovertemplate: "%{x}<br>Gage height: %{y} feet<extra></extra>",
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
        if (opacity > 0) {
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
    loadAQdata() {
      this.aqMarkers.clearLayers();
      this.allRPMarkers.clearLayers();
      let hasMarkers = false;
      let timeQueryRange = "&period=P7D";

      // adding rp/threshold data from Aquarius
      for (let entry in this.mvpData) {
        let thresh = [];
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

        for (let i = 0; i < this.mvpData[entry].rp.length; i++) {
          if (this.mvpData[entry].rp[i].Latitude !== undefined) {
            lat = this.mvpData[entry].rp[i].Latitude;
            lng = this.mvpData[entry].rp[i].Longitude;

            fullname = this.mvpData[entry].rp[i].Name;
            Name = this.mvpData[entry].rp[i].Name;
            elevation = this.mvpData[entry].rp[i].Elevation;
            unit = this.mvpData[entry].rp[i].Unit;
            siteName = this.mvpData[entry].rp[i].SiteName;
          } else {
            LocationIdentifier = this.mvpData[entry].rp[i].LocationIdentifier;
            thresh.push(this.mvpData[entry].rp[i]);
          }
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
            "wmm-pin wmm-altblue wmm-icon-noicon wmm-icon-orange wmm-size-25",
        });

        // all RP layer
        let allMarkers = L.marker([lat, lng], {
          icon: wimIcon,
        }).addTo(this.allRPMarkers);

        allMarkers.data = {
          thresholds: thresh,
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
        // end all RP Layer

        let url =
          "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
          LocationIdentifier +
          "&parameterCd=" +
          graphParameterCodeList +
          timeQueryRange;
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
              // Icon visible in legend
              if (Name === "PATH") {
                this.pathVisible = true;
              } else if (Name === "BANK") {
                this.bankVisible = true;
              } else if (Name === "ROAD") {
                this.roadVisible = true;
              } else if (Name === "CHORD") {
                this.bridgeRiskVisible = true;
              } else if (Name === "FACILITY") {
                this.facilityVisible = true;
              } else if (Name === "DECK") {
                this.bridgeFloodedVisible = true;
              } else if (Name === "BFE") {
                this.bfeVisible = true;
              } else {
                this.otherVisible = true;
              }

              // live layer
              let marker = L.marker([lat, lng], {
                icon: aqIcon,
              }).addTo(this.aqMarkers);

              marker.data = {
                thresholds: thresh,
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
            }
          }
          // Wait for last entry to add markers to map and fit bounds, otherwise bounds will be invalid
          if (hasMarkers && entry == this.mvpData.length - 1) {
            this.aqMarkers.addTo(this.map);
            this.map.fitBounds(this.aqMarkers.getBounds());
          } else if (!hasMarkers && entry == this.mvpData.length - 1) {
            this.noFloodingdialog = true;
          }
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
    getNfhlLayer() {
      var self = this;
      self.nfhlIsDisplayed = "block";
      let zoomlevel = self.currentZoom;
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
      axios.get(nfhlURL + "/export?bbox=" + bbox + "&size=1421%2C375&dpi=96&format=png32&transparent=true&bboxSR=3857&imageSR=3857&layers=show%3A0%2C3%2C14%2C27%2C28&f=image")
        .then(function () {
          // handle success
          console.log("success")
          self.nfhlFadeOutAlert();
          if (zoomlevel !== self.currentZoom) {
              this.fadeOutAlert();
              return;
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
      })
      
      let layers = this.nfhlLayer.getLayers();
      this.nfhlLayer.addTo(this.map);
      
      this.getNfhlLegend(layers);
    },
    getallRPLayer() {
      this.allRPMarkers.addTo(this.map);
    },
    getNfhlLegend(layers) {
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
        layers: [0, 1],
        f: "image/png",
      });
      this.fwwLayer.addTo(this.map);
    },
    getRadarLayer() {
      this.radarLayer = esri.dynamicMapLayer({
        url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
        layers: [3],
        f: "image/png",
      });
      this.radarLayer.addTo(this.map);
    },
  },
  mounted() {
    this.createMap();
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
    "$store.state.fwwState": function () {
      this.toggleFww(this.fwwLayer);
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

#legendContainer {
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 3px 6px rgba(30, 39, 50, 0.2), 0 3px 6px rgba(30, 39, 50, 0.2);
  right: 10px;
  top: 45px;
  height: auto;
  width: 210px;
  position: absolute;
  z-index: 999;
  font-size: 14px;
  opacity: 0.75;
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
}

.legendIcon {
  display: inline-block;
  position: relative;
  margin: 10px;
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
    padding-left: 10px;
  }
}

.legendIcon label {
  display: inline-block;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 10px;
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
  top: 10px;
  left: 50px;
  z-index: 999;
  color: #333;
  background-color: #0089e5;
  border: 1px solid #205493;
  border-radius: 2px;
  opacity: 0.75;
  font-weight: bold;
  vertical-align: middle;
  padding: 10px;
}

.loadingLabel {
  padding-left: 5px;
}

.nwis-link {
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

.nfhlLegendComponent label,
.fwwLegendComponent label,
.radarLegendComponent label {
  padding: 5px;
}

.nfhlLegendComponent img {
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

</style>
