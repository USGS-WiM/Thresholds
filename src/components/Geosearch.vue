<template>
  <div id="geosearchBar" v-if="map"></div>
</template>

<script>
import axios from "axios";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);

let graphParameterCodeList = "00065,63160,72279";
let timeQueryRange = "&period=P7D";

export default {
  props: ["map"],
  methods: {
    getMapFromParent() {
      return this.map;
    },
    openPopUp(map, siteName, siteCode, latlon) {
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

      let popupContent =
        '<label id="popup-title">NWIS Site ' +
        siteCode +
        "</br>" +
        siteName +
        '</label></br><p id="graphLoadMessage"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainer" style="width:100%; height:200px;display:none;"></div> <div>Gage Height data courtesy of the U.S. Geological Survey</div><a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        siteCode +
        '"><b>Site ' +
        siteCode +
        ' on NWISWeb <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a><div id="noDataMessage" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        siteCode +
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
          map.openPopup(popupContent, latlon);
          document
            .getElementById("graphLoadMessage")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessage")
            .setAttribute("style", "display: block");
        } else {
          map.openPopup(popupContent, latlon);
          let chartOptions = Highcharts.setOptions({
            global: { useUTC: false },
            title: {
              text: "NWIS Site " + siteCode + "<br> " + siteName,
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
              filename: "FEV_NWIS_Site" + siteCode,
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
          //Render chart
          new Highcharts.Chart("graphContainer", chartOptions);
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
  },
  mounted: function () {
    let self = this;
    let jqueryScript = document.createElement("script");
    jqueryScript.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"
    );
    document.head.appendChild(jqueryScript);

    let geosearchStylesheet = document.createElement("link");
    geosearchStylesheet.setAttribute("rel", "stylesheet");
    geosearchStylesheet.setAttribute(
      "href",
      "https://txpub.usgs.gov/DSS/search_api/2.0/api/search_api.css"
    );
    document.head.appendChild(geosearchStylesheet);

    let geosearchScript = document.createElement("script");
    geosearchScript.setAttribute(
      "src",
      "https://txpub.usgs.gov/DSS/search_api/2.0/api/search_api.min.js"
    );
    document.head.appendChild(geosearchScript);

    geosearchScript.onload = () => {
      let map = self.getMapFromParent();
      window.search_api.create("geosearchBar", {
        size: "md",
        placeholder: "Search for a location",
        menu_min_char: 2, // minimum number of characters required before attempting to find menu suggestions
        include_usgs_sw: true,
        include_usgs_gw: true,
        include_usgs_sp: true,
        include_usgs_at: true,
        include_usgs_ot: true,
        on_result: function (o) {
          map.fitBounds([
            // zoom to location
            [o.result.properties.LatMin, o.result.properties.LonMin],
            [o.result.properties.LatMax, o.result.properties.LonMax],
          ]);
          // Open streamgage popup with chart if USGS ground or surface water site was searched
          if (
            o.result.properties.Category.indexOf("USGS Site: Surface Water") !==
              -1 ||
            o.result.properties.Category.indexOf("USGS Site: Ground Water") !==
              -1
          ) {
            let siteName = o.result.properties.Label.substr(
              o.result.properties.Label.indexOf(" ") + 1
            );
            let siteCode = o.result.properties.Label.split(" ")[0];
            let latlon = [o.result.properties.Lat, o.result.properties.Lon];
            self.openPopUp(map, siteName, siteCode, latlon);
          } else {
            map.openPopup(
              // open popup
              "<b>" +
                o.result.properties.Label +
                "</b><br/><i>" +
                o.result.properties.Category +
                "</i>",
              [o.result.properties.Lat, o.result.properties.Lon]
            );
          }
        },
      });
    };
  },
};
</script>

<style>
#geosearchBar {
  margin-left: auto;
}
</style>
