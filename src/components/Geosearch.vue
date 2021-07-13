<template>
    <div id="geosearchBar" v-if="map">
    </div>
</template>

<script>

  export default {
    props: ['map'],
    methods: {
      getMapFromParent(){
        return this.map;
      }
    },
    mounted: function() {
        let jqueryScript = document.createElement('script')
        jqueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js')
        document.head.appendChild(jqueryScript)

        let geosearchStylesheet = document.createElement('link')
        geosearchStylesheet.setAttribute('rel', 'stylesheet')
        geosearchStylesheet.setAttribute('href', 'https://txpub.usgs.gov/DSS/search_api/2.0/api/search_api.css')
        document.head.appendChild(geosearchStylesheet)

        let geosearchScript = document.createElement('script')
        geosearchScript.setAttribute('src', 'https://txpub.usgs.gov/DSS/search_api/2.0/api/search_api.min.js')
        document.head.appendChild(geosearchScript)
        geosearchScript.onload = () => {
          let map = this.getMapFromParent();
          window.search_api.create("geosearchBar", {
            size: "md",
            placeholder: "Search for a location",
            include_usgs_sw: true,
            include_usgs_gw: true,
            include_usgs_sp: true,
            include_usgs_at: true,
            include_usgs_ot: true,
            on_result: function(o) {
                map 
                  .fitBounds([ // zoom to location 
                      [ o.result.properties.LatMin, o.result.properties.LonMin ], 
                      [ o.result.properties.LatMax, o.result.properties.LonMax ] 
                  ]) 
                  .openPopup( // open popup 
                      "<b>"+o.result.properties.Label+"</b><br/><i>"+o.result.properties.Category +"</i>", 
                      [ o.result.properties.Lat, o.result.properties.Lon ] 
                  ); 
                  // Add additional code to replace this functionality and open streamgage popup if streamgage is searched
                  // Need to load streamgage layer first
            }
          }); 
        }
    }
  }
</script>

<style>
#geosearchBar{
  margin-left: 30px;
}
</style>
