<template>
  <v-main>
    <div style="height: 100%; width: 100%">
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
        layer-type="overlay"
        name="Markers"
        :visible="true">
        <l-marker v-for="marker in markers"
            :key="marker.id"
            :visible="marker.visible"
            :lat-lng="marker.position"
            :icon="nwisIcon"/>
        </l-layer-group>
      <!-- to load a geojson -->
      <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
      </l-map>
    </div>
  </v-main>
</template>

<script>
import { latLng, Icon, divIcon } from "leaflet"; //this is where you import leaflet components not found in vue2-leaflet
import { LMap, LTileLayer, LMarker, LControlScale, LControl, LGeoJson, LLayerGroup } from "vue2-leaflet"; //this is where you import components made easy by vue2-leaflet
import "leaflet/dist/leaflet.css";
import data from "../mvp_data/data.json";

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

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlScale,
    LControl,
    LGeoJson,
    LLayerGroup
  },
  data() {
    return {
      show: true,
      zoom: 4,
      lat: 37.0902,
      long: -82.7129,
      center: latLng(37.0902, -82.7129),
      tileProviders: tileProviders,
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
      currentZoom: 4,
      currentCenter: latLng(37.0902, -82.7129),
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
    },
    centerUpdate(center) {
      this.currentCenter = center;
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

</style>
