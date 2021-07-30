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
        <span class="loadingLabel">Loading Layers...</span>
      </div>

      <!-- a leaflet map -->
      <div id="map">
        <!-- Legend -->
        <v-expansion-panels id="legendContainer">
          <v-expansion-panel>
            <!-- Legend title -->
            <v-expansion-panel-header id="titleContainer">
              <div id="legendExplanation">
                <v-icon color="black">mdi-shape</v-icon> Legend
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Toggleable layers -->
              <div id="toggleableLayers">
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
                  <label>Real-time Stream Gage</label>
                </div>
              </div>
              <!-- Threshold icons -->
              <div id="thresholdLayers">
                <div id="thresholdLayersTitle">Streamgage Status</div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/embankment_flooded_circle.png"
                    height="25px"
                    width="25px"
                  />
                  <label>Embankment Flooded</label>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/path_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Path Flooded</label>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/car_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Road Flooded</label>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/bridge_risk_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flood at Risk</label>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/bridge_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Bridge Flooded</label>
                </div>
                <div class="legendIcon">
                  <img
                    src="../assets/aq-icons/building_flooded_circle.png"
                    alt=""
                    height="25px"
                    width="25px"
                  />
                  <label>Structures Flooded</label>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </v-main>
</template>

<script>
import L from "leaflet"; //this is where you import leaflet components
import "leaflet/dist/leaflet.css";
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
      aqMarkers: [],
      popupContent: "",
      aqPopupContent: "",
      alertOpacity: "0.75",
      mvpData: mvpAqData,
      isDisplayed: "none",
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
      deckIcon: L.icon({
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
      rpIcon: L.icon({
        iconUrl: require("../assets/aq-icons/blue_tri.png"),
        iconSize: [50, 50],
      }),
      showParagraph: false,
      fillColor: "#ffffff",
      streamgageVisible: false,
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

      console.log(self.map);

      //Add Topo tilelayer to map initially
      L.tileLayer(tileProviders[2].url, {
        attribution: tileProviders[2].attribution,
        name: tileProviders[2].name,
      }).addTo(self.map);

      self.streamgageMarkers = L.featureGroup();

      // markers from Aquarius TEST environment
      self.aqMarkers = L.featureGroup();
      self.aqMarkers.on("click", function (e) {
        self.openAQPopup(e);
      });

      self.streamgageMarkers.on("click", function (e) {
        self.openStreamGagePopup(e);
      });

      let latlngDiv;

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
      if (document.getElementById("graphContainer") != null) {
        document.getElementById("graphContainer").remove();
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

      this.popupContent =
        '<label id="popup-title">NWIS Site ' +
        e.layer.data.siteCode +
        "</br>" +
        e.layer.data.siteName +
        '</label></br><p id="graphLoadMessage"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainer" style="width:100%; height:200px;display:none;"></div> <div>Gage Height data courtesy of the U.S. Geological Survey</div><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
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
              .setContent(this.popupContent, { minWidth: 400 })
              .openPopup();
          } else {
            e.layer.bindPopup(this.popupContent, { minWidth: 400 }).openPopup();
          }
          document
            .getElementById("graphLoadMessage")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessage")
            .setAttribute("style", "display: block");
        } else {
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.popupContent, { minWidth: 400 })
              .openPopup();
          } else {
            e.layer.bindPopup(this.popupContent, { minWidth: 400 }).openPopup();
          }

          let dates = [];
          let values = [];
          let plotlyAnnotations = [];

          // Create x and y arrays for NWIS trace
          data.data.data[0].time_series_data.forEach(function (time) {
            dates.push(new Date(time[0]));
            values.push(time[1]);
          });

          // NWIS trace
          let traces = [
            {
              x: dates,
              y: values,
              type: "scatter",
              showlegend: false,
              name: "NWIS Gage Data",
              hovertemplate: "%{x}<br>Gage height: %{y} feet<extra></extra>",
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          ];

          // Overall layout of chart
          let graphtitle =
            "<b>NWIS Site " +
            e.layer.data.siteCode +
            "<br>" +
            e.layer.data.siteName +
            "</b>";

          let layout = {
            autosize: false,
            width: 400,
            height: 400,
            font: {
              family: "Public Sans, sans-serif",
            },
            yaxis: {
              title: "Gage Height, feet",
              titlefont: { size: 12 },
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
                color: "rgba(0,0,0,0.6)",
              },
              x: 0.05,
            },
            margin: {
              l: 50,
              r: 50,
              t: 100,
              pad: 4,
            },
            legend: false,
            annotations: plotlyAnnotations,
            hoverlabel: {
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          };

          // Make chart responsive and modebar always visible
          let config = { responsive: true, displayModeBar: true };

          let chartData = [];

          traces.forEach(function (trace) {
            chartData.push(trace);
          });

          // Render plot
          Plotly.newPlot("graphContainer", chartData, layout, config);
          document
            .getElementById("graphContainer")
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
      // Create array of objects for each threshold with name, value, and series info
      layerData.thresholds[0].Thresholds.forEach(function (threshold) {
        thresholds.push({
          name: threshold.Name,
          value: threshold.Periods[0].ReferenceValue,
          series: [],
        });
      });

      thresholds.sort(function (a, b) {
        return a.value - b.value;
      });

      // setting start date for now
      let startDate;
      let day;
      let month;
      let year;
      startDate = new Date();

      // getting date elements
      day = startDate.getDate();
      month = startDate.getMonth() + 1; // to get the correct month you must add 1
      year = startDate.getFullYear();

      // creating string for request
      let dateString = "&startDT=" + year + "-" + month + "-" + day;

      this.aqPopupContent =
        '<label id="popup-titleAQ"><b>Reference Point Name: </b>' +
        layerData.Name +
        "</br>" +
        '<label id="popup-titleAQ"><b>Location ID: </b>' +
        layerData.LocationIdentifier +
        "</br>" +
        '<label id="popup-titleAQ"><b>Elevation: </b>' +
        layerData.ReferencePointPeriods[0].Elevation +
        " " +
        layerData.ReferencePointPeriods[0].Unit +
        "</br>" +
        '</label></br><p id="graphLoadMessageAQ"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainerAQ" style="width:100%; height:200px;display:none;"></div> <div>Gage Height data courtesy of the U.S. Geological Survey</div><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        sc +
        '"><b>Site ' +
        ' on NWISWeb <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a><div id="noDataMessageAQ" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        sc +
        "&parameterCd=" +
        graphParameterCodeList +
        dateString;
      axios.get(url).then((data) => {
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

        // NWIS trace
        let traces = [
          {
            x: dates,
            y: values,
            type: "scatter",
            showlegend: true,
            name: "<b>NWIS Gage Data</b>",
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
          // Label position variables
          let x;
          let ax = -10;
          let ay = -25;

          // Add one line representing all thresholds to legend
          let showLegend = false;

          if (i == 0) {
            showLegend = true;
          }

          // Switch label position if thresholds are too close together
          if (i < thresholds.length - 1) {
            if (
              Math.abs(thresholds[i].value - thresholds[i + 1].value) <= 0.75
            ) {
              x = thresholds[i].series[0][0];
              ax = 50;
              ay = -30;
            } else {
              x = thresholds[i].series[thresholds[i].series.length - 1][0];
            }
          } else {
            x = thresholds[i].series[thresholds[i].series.length - 1][0];
          }

          // Create x and y arrays for threshold traces
          thresholds[i].series.forEach(function (datapoint) {
            let xdatapoint = new Date(datapoint[0]);
            xdata.push(xdatapoint);
            ydata.push(datapoint[1]);
          });

          // Create traces
          traces.push({
            x: xdata,
            y: ydata,
            type: "scatter",
            line: {
              color: "#8b0000",
            },
            showlegend: showLegend,
            legendgroup: "thresholds",
            name: "<b>Threshold</b>",
            // Tooltip
            hovertemplate: "%{fullData.name}: %{y} feet<extra></extra>",
            font: {
              family: "Public Sans, sans-serif",
            },
          });

          // Create labels
          plotlyAnnotations.push({
            x: x,
            y: ydata[0],
            xref: "x",
            yref: "y",
            text: thresholds[i].name,
            showarrow: true,
            arrowhead: 0,
            font: {
              family: "Public Sans, sans-serif",
              size: 11,
            },
            ax: ax,
            ay: ay,
          });
        }

        if (
          data.data == undefined ||
          data.data.response_code == 404 ||
          data.data.data[0].time_series_data.length == 0
        ) {
          console.log("No NWIS data available for this time period");
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.aqPopupContent, { minWidth: 600 })
              .openPopup();
          } else {
            e.layer
              .bindPopup(this.aqPopupContent, { minWidth: 600 })
              .openPopup();
          }
          document
            .getElementById("graphLoadMessageAQ")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessageAQ")
            .setAttribute("style", "display: block");
        } else {
          if (e.layer.getPopup() != undefined) {
            e.layer
              .getPopup()
              .setContent(this.aqPopupContent, { minWidth: 600 })
              .openPopup();
          } else {
            e.layer
              .bindPopup(this.aqPopupContent, { minWidth: 600 })
              .openPopup();
          }

          // Overall layout of chart
          let graphtitle = "<b>NWIS Site " + sc + "<br></b>";
          // "<br>" +
          //   e.layer.data.siteName +
          //   "</b>";

          let layout = {
            autosize: false,
            width: 600,
            font: {
              family: "Public Sans, sans-serif",
            },
            yaxis: {
              title: "Gage Height, feet",
              titlefont: { size: 12 },
              automargin: true,
            },
            xaxis: {
              range: [dates[0], dates[dates.length - 1]],
              tickformat: "%d %b %y %-I:%M %p",
              tickfont: {
                size: 11,
              },
            },
            title: {
              text: graphtitle,
              font: {
                size: 12,
                color: "rgba(0,0,0,0.6)",
              },
              x: 0.05,
            },
            legend: {
              x: 0.25,
              y: -0.4,
              font: {
                size: 12,
              },
              orientation: "h",
            },
            margin: {
              l: 70,
              r: 70,
              b: 100,
              t: 100,
              pad: 4,
            },
            annotations: plotlyAnnotations,
            hoverlabel: {
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          };

          // Make chart responsive and modebar always visible
          let config = { responsive: true, displayModeBar: true };

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
    loadAQdata() {
      this.aqMarkers.clearLayers();
      // adding rp/threshold data from Aquarius
      for (let entry in this.mvpData) {
        let thresh = [];
        let LocationIdentifier;
        let Name;
        let rpData;
        let lat;
        let lng;
        let aqIcon;

        for (let i = 0; i < this.mvpData[entry].referencePoint.length; i++) {
          if (this.mvpData[entry].referencePoint[i].Latitude !== undefined) {
            lat = this.mvpData[entry].referencePoint[i].Latitude;
            lng = this.mvpData[entry].referencePoint[i].Longitude;

            Name = this.mvpData[entry].referencePoint[i].Name;
            rpData =
              this.mvpData[entry].referencePoint[i].ReferencePointPeriods;
          } else {
            LocationIdentifier =
              this.mvpData[entry].referencePoint[i].LocationIdentifier;
            thresh.push(this.mvpData[entry].referencePoint[i]);
          }
        }

        // Determine Icon for Reference Point
        if (Name === "DECK") {
          aqIcon = this.deckIcon;
        } else if (Name === "BANK") {
          aqIcon = this.bankIcon;
        } else if (Name === "ROAD") {
          aqIcon = this.roadIcon;
        } else {
          aqIcon = this.rpIcon;
        }

        let marker = L.marker([lat, lng], {
          icon: aqIcon,
        }).addTo(this.aqMarkers);

        marker.data = {
          thresholds: thresh,
          LocationIdentifier: LocationIdentifier,
          Name: Name,
          ReferencePointPeriods: rpData,
          lat: lat,
          lng: lng,
        };
      }
      console.log(this.aqMarkers);
      this.aqMarkers.addTo(this.map);
      this.map.fitBounds(this.aqMarkers.getBounds());
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
    },
    "$store.state.streamgageState": function () {
      this.toggleStreamgage(this.streamgageMarkers, this.currentZoom);
    },
    // Watch basemap state and update visibility when state changes
    "$store.state.basemapState": function () {
      this.selectBasemap(this.tileProviders);
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
}

#legendContainer {
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 3px 6px rgba(30, 39, 50, 0.2), 0 3px 6px rgba(30, 39, 50, 0.2);
  margin-top: 5px;
  right: 10px;
  top: 56px;
  height: auto;
  width: 250px;
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
  padding: 10px;
}

#thresholdLayersTitle {
  font-size: 16px;
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

.nwisAlertClass {
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
  font-size: 12;
  color: rgba(0, 0, 0, 0.6);
  font-family: "Public Sans", sans-serif;
  font-weight: bold;
}
</style>
