<template>
  <div id="geosearchBar" v-if="map"></div>
</template>

<script>
import axios from "axios";
import Plotly from "plotly.js";
import { text } from "../mixins/text.js";

let graphParameterCodeList = "00065,63160,72279";

export default {
  mixins: [text],
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
        '<label id="popup-title">' +
        '<a class="nwis-link" target="_blank" href="https://nwis.waterdata.usgs.gov/nwis/uv?site_no=' +
        siteCode +
        '"> <b>NWIS Site ' +
        siteCode +
        ' <i class="v-icon notranslate mdi mdi-open-in-new" style="font-size:16px"></i></b></a></br>' +
        siteName +
        '</label></br><p id="graphLoadMessage"><v-progress-circular indeterminate :width=3 :size=20></v-progress-circular><span> NWIS data graph loading...</span></p><div id="graphContainer" style="width:100%; min-height:200px;display:none;"></div> <div id="dataCredit">Gage Height data courtesy of the U.S. Geological Survey</div><div id="noDataMessage" style="width:100%;display:none;"><b><span>NWIS water level data not available to graph</span></b></div>';
      let url =
        "https://nwis.waterservices.usgs.gov/nwis/iv/?format=nwjson&sites=" +
        siteCode +
        "&parameterCd=" +
        graphParameterCodeList +
        this.timePeriodValue;
      axios.get(url).then((data) => {
        if (
          data.data == undefined ||
          data.data.response_code == 404 ||
          data.data.data[0].time_series_data.length == 0
        ) {
          console.log("No NWIS data available for this time period");
          map.openPopup(popupContent, latlon, { minWidth: 300 });
          document
            .getElementById("graphLoadMessage")
            .setAttribute("style", "display: none");
          document
            .getElementById("dataCredit")
            .setAttribute("style", "display: none");
          document
            .getElementById("noDataMessage")
            .setAttribute("style", "display: block");
        } else {
          map.openPopup(popupContent, latlon, { minWidth: 300 });
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
              name: "Gage Height",
              hovertemplate: "%{x}<br>Gage height: %{y} feet<extra></extra>",
              font: {
                family: "Public Sans, sans-serif",
              },
            },
          ];

          // Overall layout of chart
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
          Plotly.newPlot("graphContainer", chartData, layout, config);
          document
            .getElementById("graphContainer")
            .setAttribute("style", "display: block");
          document
            .getElementById("graphLoadMessage")
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

    jqueryScript.onload = () => {
      let geosearchStylesheet = document.createElement("link");
      geosearchStylesheet.setAttribute("rel", "stylesheet");
      geosearchStylesheet.setAttribute(
        "href",
        "https://txpub.usgs.gov/DSS/search_api/2.0/api/search_api.css"
      );
      document.head.appendChild(geosearchStylesheet);

      geosearchStylesheet.onload = () => {
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
            placeholder: "Search",
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
                o.result.properties.Category.indexOf(
                  "USGS Site: Surface Water"
                ) !== -1 ||
                o.result.properties.Category.indexOf(
                  "USGS Site: Ground Water"
                ) !== -1
              ) {
                let siteName = o.result.properties.Label.split("(")[0].substr(
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
      };
    };
  },
  computed: {
    timePeriodValue: {
      get() {
        return this.$store.state.selectedTimePeriodState;
      },
    },
  },
};
</script>
import { text } from "../mixins/text.js";

<style>
#geosearchBar {
  margin-left: auto;
}

.search-api-container {
  height: 36px !important;
  border: 2px solid #afafaf !important;
}

.search-api-container input {
  font-family: "Public Sans", sans-serif !important;
  font-size: 18px !important;
  color: #333;
}

.search-api-menu {
  font-family: "Public Sans", sans-serif !important;
}

.search-api-button {
  padding-right: 4px !important;
  width: 32px !important;
}

.search-api-menu-title {
  color: #fff !important;
  background-color: #999 !important;
}

.search-api-menu-separator {
  background-color: #333 !important;
  color: #eee !important;
}

.search-api-menu-item {
  background-color: #0a0a57 !important;
  color: white !important;
}

/* Remove blue outline from search input container when focused */
input:not([disabled]):focus {
  outline: none;
}

@media screen and (max-width: 1024px) {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 4px 8px 4px 16px !important;
  }
}

@media screen and (max-width: 828px) {
  .search-api-container {
    height: 28px !important;
  }
  .search-api-container input {
    font-size: 12px !important;
  }
  .search-api-container.search-api-md {
    width: 150px;
  }
}

@media screen and (min-width: 828px) {
  .search-api-container input {
    font-size: 16px !important;
  }

  .search-api-container.search-api-md {
    width: 200px;
  }
}

@media screen and (max-width: 450px) {
  .search-api-container input {
    font-size: 12px !important;
  }
  .search-api-container.search-api-md {
    width: 110px;
  }
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 4px 8px 4px 8px !important;
  }
}

#dataCredit {
  font-size: 10px;
}
</style>
