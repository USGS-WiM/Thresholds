<template>
  <v-main>
    <div style="height: 100%; width: 100%">
    <!-- a leaflet map -->
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :bounds="bounds"
        :options="mapOptions"
        style="height: 98%"
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
        layer-type="base"
      />
      <l-layer-group
      layer-type="overlay"
      name="Real-time streamgages"
      :visibile="true">
      <ul>
        <li v-for="(l,i) in latlong" :key="i">
            <l-marker :lat-lng="l"
            :icon="nwisIcon"></l-marker>
        </li>
      </ul>
      </l-layer-group>
      <!-- dynamic scale in miles or kilometers -->
      <l-control-scale position="topright" :imperial="true" :metric="false"/>
      <!-- dynamic scale in zoom level and current lat/long of mouse -->
      <l-control position="bottomleft" >
        <button>
          Latitude: {{ lat }}, Longitude: {{ long }}
          <br/>
          Current Zoom: {{ currentZoom }}
          <br/>
          Test {{ currentBounds._southWest.lat }}
        </button>
      </l-control>
      <!-- leaflet control panel -->
      <l-control-layers
        :collapsed="true"
        :sort-layers="false"/>
      <!-- to load a geojson -->
      <l-geo-json :geojson="geojson"></l-geo-json>
      </l-map>
    </div>
  </v-main>
</template>

<script>
import { latLng, Icon, divIcon } from "leaflet"; //this is where you import leaflet components not found in vue2-leaflet
import { LMap, LTileLayer, LMarker, LControlLayers, LControlScale, LControl, LGeoJson, LLayerGroup } from "vue2-leaflet"; //this is where you import components made easy by vue2-leaflet
import "leaflet/dist/leaflet.css";
import axios from "axios";

//this code is necessary for the default leaflet marker to work
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// var parseString = require('xml2js').parseString;

// var USGSrtGages = featureGroup().addLayer(info);

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


var parameterCodeList = "00065,63160,72214";
var siteTypeList = "OC,OC-CO,ES,LK,ST,ST-CA,ST-DCH,ST-TS";
var siteStatus = "active";
//var bbox = currentBounds._southWest.lng + "," + currentBounds._southWest.lat + "," + currentBounds._northEast.lng + "," + currentBounds._northEast.lat;
var bbox = "-83.000000,36.500000,-81.000000,38.500000";
var url =
    "https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=" +
    bbox +
    "&parameterCd=" +
    parameterCodeList +
    "&siteType=" +
    siteTypeList +
    "&siteStatus=" +
    siteStatus;

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
    LControlScale,
    LControl,
    LGeoJson,
    LLayerGroup
  },
  data() {
    return {
      info: null,
      show: true,
      zoom: 4,
      lat: 37.0902,
      long: -82.7129,
      center: latLng(37.0902, -82.7129),
      tileProviders: tileProviders,
      latlong: [],
      bounds: null,
      //url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //attribution:
        //'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
      fillColor: "#ffffff",
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  //if you want to load a geojson layer
  /*async created () {
    const response = await fetch('https://stn.wim.usgs.gov/STNServices/SensorViews.geojson?ViewType=baro_view&',
    );
    this.geojson = await response.json();
  },*/
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    boundsUpdate(bounds) {
      this.currentBounds = bounds;
      console.log(this.currentBounds);
    },
    getLatLng: function(event) {
      this.lat = parseFloat(event.latlng.lat).toFixed(6);
      this.long = parseFloat(event.latlng.lng).toFixed(6);
    }
  },
  mounted () {
    axios.get(url)
    .then(r => r["data"])
    .then(data => {
      for(var i=0;i<2000;i++){
          var a=[];
          a.push(parseFloat(data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation["latitude"]));
          a.push(parseFloat(data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation["longitude"]));
          this.latlong.push(a);
        }
      }) 
  }
}
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

</style>
