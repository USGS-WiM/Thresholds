<template>
  <v-main>
    <div style="height: 100%; width: 100%">
      <div id="nwisLoadingAlert" class="alert nwisAlertClass fade" role="alert" :style="{ display: isDisplayed, opacity: alertOpacity }"><md-progress-spinner class="md-primary" :md-stroke="3" :md-diameter="20" md-mode="indeterminate"></md-progress-spinner>
      <span class="loadingLabel">Loading Layers...</span></div>

    <!-- a leaflet map -->
      <l-map
        ref="map"
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 98%"
        @ready="getMapObject"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
        @update:bounds="boundsUpdate"
        @mousemove="getLatLng"
      >
      <!-- basemaps -->
        <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="token"
        layer-type="base"
      />
      <!-- dynamic scale in miles or kilometers -->
      <l-control-scale position="topright" :imperial="true" :metric="false"/>
      <!-- dynamic scale in zoom level and current lat/long of mouse -->
      <l-control position="bottomleft" >
        <button>
          Latitude: {{ lat }}, Longitude: {{ long }}
          <br/>
          Current Zoom: {{ currentZoom }}
        </button>
      </l-control>
      <!-- markers (these ones use custom wim divIcon styling not leaflet default) -->
      <l-layer-group 
        ref="streamgageLayer"
        layer-type="overlay"
        name="streamgageLayer"
        :visible="true">
        <l-popup ></l-popup>
        <l-marker v-for="marker in streamgageMarkers"
            :key="marker.id"
            :visible="marker.visible"
            :lat-lng="marker.position"
            :icon="nwisIcon"
            @click="openPopUp(marker.position, marker)"/>
        </l-layer-group>
      <!-- to load a geojson -->
      <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
      </l-map>
    </div>
  </v-main>
</template>

<script>
import { latLng, Icon, divIcon } from "leaflet"; //this is where you import leaflet components not found in vue2-leaflet
import { LMap, LTileLayer, LMarker, LControlScale, LControl, LGeoJson, LLayerGroup, LPopup } from "vue2-leaflet"; //this is where you import components made easy by vue2-leaflet
import "leaflet/dist/leaflet.css";
import data from "../mvp_data/data.json";
import axios from 'axios';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';

exportingInit(Highcharts);

//this code is necessary for the default leaflet marker to work
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

//define basemaps
var tileProviders = [
  {
    name: 'Streets',
    visible: false,
    attribution:
      'Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  },
  {
    name: 'Satellite',
    visible: false,
    attribution:
      'Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  {
    name: 'Topo',
    visible: true,
    attribution:
      'Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  },
  {
    name: 'Terrain',
    visible: false,
    attribution:
      'Esri, NAVTEQ, DeLorme',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
  },
  {
    name: 'Gray',
    visible: false,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Esri, NAVTEQ, DeLorme',
  },
  {
    name: 'NatGeo',
    visible: false,
    attribution:
      'Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  },
];

// Variables for NWIS sites query
let parameterCodeList = "00065,63160,72214";
let siteTypeList = "OC,OC-CO,ES,LK,ST,ST-CA,ST-DCH,ST-TS";
let siteStatus = "active";

let graphParameterCodeList = "00065,63160,72279";
let timeQueryRange = "&period=P7D";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlScale,
    LControl,
    LGeoJson,
    LLayerGroup,
    LPopup
  },
  data() {
    return {
      show: true,
      zoom: 4,
      lat: 37.0902,
      long: -82.7129,
      center: latLng(37.0902, -82.7129),
      tileProviders: tileProviders,
      streamgageMarkers: [],
      popupContent: '',
      alertOpacity: "0.75",
      //url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //attribution:
        //'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      /* markers: [
        {
          id: "m1",
          position: { lat: 43.0689, lng: -89.3405 },
          draggable: true,
          visible: true
        },
        {
          id: "m2",
          position: { lat: 44.9492, lng: -93.2077 },
          draggable: true,
          visible: true
        },
        {
          id: "m3",
          position: { lat: 38.9252, lng: -76.4646 },
          draggable: true,
          visible: true
        },
      ], */
      isDisplayed: "none",
      currentZoom: 4,
      currentCenter: latLng(37.0902, -82.7129),
      currentBounds: {
        _southWest: {
          lat: {},
          lng: {}
        },
        _northEast: {
          lat: {},
          lng: {}
        }
      },
      nwisIcon: divIcon({className: 'wmm-circle wmm-mutedblue wmm-icon-triangle wmm-icon-black wmm-size-20 wmm-borderless'}), //custom WIM icons
      showParagraph: false,
      geojson: null,
      options: {
        onEachFeature: function onEachFeature(feature, layer) {
          // does this feature have a property named popupContent?
            layer.bindPopup("Elevation at " + feature.properties.Name + " is " + feature.properties.Elevation);
        }
      },
      fillColor: "#ffffff",
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      mapData: data
    };
  },
  //if you want to load a geojson layer
  async created () {
    this.geojson = data
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
      this.zoomValue = this.currentZoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    boundsUpdate(bounds) {
      this.currentBounds = bounds;
    },
    getLatLng: function(event) {
      this.lat = parseFloat(event.latlng.lat).toFixed(6);
      this.long = parseFloat(event.latlng.lng).toFixed(6);
    },
    // Pass map object and tile providers to parent
    getMapObject() {
      this.map = this.$refs.map.mapObject;
      this.$emit('getMap', this.map)
      this.$emit('emitTileProviders', this.tileProviders)
    },
    // Get streamgage layer
    getData(){
      this.isDisplayed = "block";
      this.streamgageMarkers = [];
      let zoomlevel = this.currentZoom;
      let extent = this.currentBounds;
      let bbox = this.currentBounds._southWest.lng.toFixed(7)  + "," + this.currentBounds._southWest.lat.toFixed(7) + "," + this.currentBounds._northEast.lng.toFixed(7) + "," + this.currentBounds._northEast.lat.toFixed(7);
      let url =
          "https://waterservices.usgs.gov/nwis/site/?format=mapper&bBox=" +
          bbox +
          "&parameterCd=" +
          parameterCodeList +
          "&siteType=" +
          siteTypeList +
          "&siteStatus=" +
          siteStatus;
      axios.get(url)
      .then(data => {
          let domParser = new DOMParser();
          let xmlElement = domParser.parseFromString(data.data, 'text/xml');
          let streamGageList = xmlElement.getElementsByTagName('site');
          for (let i = 0; i < streamGageList.length; i++) {
            let lat = parseFloat(streamGageList[i].getAttribute('lat'))
            let lng = parseFloat(streamGageList[i].getAttribute('lng'))
            let siteID = streamGageList[i].getAttribute("sno");
            let siteName = streamGageList[i].getAttribute("sna");
            if (zoomlevel !== this.currentZoom || extent !== this.currentBounds){
              return;
            }
            if(this.$store.state.streamgageState == true){
              this.streamgageMarkers.push({id: siteID, position: {lat: lat, lng: lng}, draggable: true, visible: true, data: {siteName: siteName, siteCode: siteID}})

            }else{
              this.streamgageMarkers.push({id: siteID, position: {lat: lat, lng: lng}, draggable: true, visible: false, data: {siteName: siteName, siteCode: siteID}})
            }
          }
          // this.isDisplayed = "none";
          this.fadeOutAlert();
      })
      .catch((error) => {
        if (error.message == 'Request failed with status code 404'){
          console.log("No streamgages found")
        }
        // this.isDisplayed = "none";
        this.fadeOutAlert();
      })
    },
    // set streamgage visibility according to checkbox and currentZoom values
    toggleStreamgage(streamgageMarkers, currentZoom) {
      this.streamgageMarkers = streamgageMarkers;
      if(this.$store.state.streamgageState == true && currentZoom >= 9){
        this.getData();
      }
      for (let i = 0; i < streamgageMarkers.length; i++){
        if(this.$store.state.streamgageState == true && currentZoom >= 9){
          streamgageMarkers[i].visible = true;
        }else{
          streamgageMarkers[i].visible = false;
        }
      }
    },
    openPopUp (latLng, marker) {
      this.popupContent = '<label id="popup-title">NWIS Site ' +
        marker.data.siteCode +
        "</br>" +
        marker.data.siteName +
        '</span></label></br><p id="graphLoadMessage"><md-progress-spinner class="md-primary" :md-stroke="3" :md-diameter="20" md-mode="indeterminate"></md-progress-spinner><span> NWIS data graph loading...</span></p><div id="graphContainer" style="width:100%; height:200px;display:none;"></div> <div>Gage Height data courtesy of the U.S. Geological Survey</div><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        marker.data.siteCode +
        '"><b>Site ' +
        marker.data.siteCode +
        ' on NWISWeb <i class="fa fa-external-link" aria-hidden="true"></i></b></a><div id="noDataMessage" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>'
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        marker.data.siteCode +
        "&parameterCd=" +
        graphParameterCodeList +
        timeQueryRange;
      axios.get(url)
      .then(data => {
        if (data.data == undefined || data.data.data[0].time_series_data.length == 0) {
          console.log("No NWIS data available for this time period");
          this.$refs.streamgageLayer.mapObject.bindPopup(this.popupContent);
          document.getElementById('graphLoadMessage').style.display = 'none';
          document.getElementById('noDataMessage').style.display = 'block';
        } else {
          this.$refs.streamgageLayer.mapObject.bindPopup(this.popupContent);
          let chartOptions = Highcharts.setOptions({
            global: { useUTC: false },
            title: {
              text:
                  "NWIS Site " +
                  marker.data.siteCode +
                  "<br> " +
                  marker.data.siteName,
              align: "left",
              style: {
                  color: "rgba(0,0,0,0.6)",
                  fontSize: "small",
                  fontWeight: "bold",
                  fontFamily: "Open Sans, sans-serif",
              },
            },
            exporting: {
                enabled: true,
                filename: "FEV_NWIS_Site" + marker.data.siteCode,
            },
            credits: {
            enabled: false,
            },
            xAxis: {
            type: "datetime",
            labels: {
                formatter: function () {
                let num = Number(this.value);
                return Highcharts.dateFormat("%d %b %y", num);
                },
                align: "center",
            },
            },
            yAxis: {
            title: { text: "Gage Height, feet" },
            },
            series: [
            {
                showInLegend: false,
                type: "line",
                data: data.data.data[0].time_series_data,
                tooltip: {
                pointFormat: "Gage height: {point.y} feet",
                },
            },
            ],
          });
          new Highcharts.Chart('graphContainer', chartOptions)
          document.getElementById('graphContainer').style.display = 'block';
          document.getElementById('graphLoadMessage').style.display = 'none';
          document.getElementById('popup-title').style.display = 'none';
      }
      })
      this.$refs.streamgageLayer.mapObject.openPopup(latLng);
    },
    fadeOutAlert(){
      //Fade out loading alert
      let opacity = 0.75;
      let self = this;
      let fadeOut = setInterval(function(){
          if (opacity > 0){
              opacity -= 0.05;
              let opacityValue = String(opacity);
              self.alertOpacity = opacityValue;
          }else{
              self.alertOpacity = "0.75"
              self.isDisplayed = "none";
              clearInterval(fadeOut);
          }
      }, 50)
    }
  },
  watch: {
    currentBounds: function(){
      this.streamgageMarkers = [];
      this.toggleStreamgage(this.streamgageMarkers, this.currentZoom);
    },
    '$store.state.streamgageState': function (){
      this.toggleStreamgage(this.streamgageMarkers, this.currentZoom);
    },
  },
  computed: {
    zoomValue: {
      get() {
        return this.$store.state.currentZoomState;
      },
      set(value) {
        return this.$store.commit("getCurrentZoomState", value);
      },
    }
  }
};
</script>

<style scoped> /*placing "scoped" after style affects only the current file*/
  @import '../styles/markers.css';
button {
  background-color: #ECEEF3;
  border-radius: 0;
  border: none;
  box-shadow: 0 3px 6px rgba(30, 39, 50, 0.2), 0 3px 6px rgba(30, 39, 50, 0.2);
  color: #6F758E;
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
    background-color: #ECEEF3;
    border: 1px solid #205493;
    border-radius: 2px;
    opacity: 0.75;
    font-weight: bold;
    vertical-align: middle;
    padding: 10px;
}

.loadingLabel{
  padding-left: 5px;
}
</style>
