<template>
  <div id="about">
    <div class="text-center">
      <v-dialog v-model="dialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
            id="about-button-desktop"
          >
            <div style="color: black; min-width: 75px" id="aboutButton">
              About
            </div>
          </v-btn>
          <v-btn
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
            id="about-button-mobile"
          >
            <v-icon small color="#333">mdi mdi-information</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ this.about_h4() }}
          </v-card-title>

          <v-card-text>
            <h4>{{ this.about_h4() }}</h4>
            <p>
              {{ this.about_p1() }}
            </p>
            <p>
              {{ this.about_p2() }}
            </p>
            <p>
              {{ this.about_p3() }}
            </p>
            <ul>
              <li>
                <strong>{{ this.embankmentFlooded() }}</strong> –
                {{ this.embankmentFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.pathFlooded() }}</strong> –
                {{ this.pathFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.roadFlooded() }}</strong> –
                {{ this.roadFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.bridgeFloodRisk() }}</strong> –
                {{ this.bridgeAtRiskTooltip() }}
              </li>
              <li>
                <strong>{{ this.bridgeFlooded() }}</strong> –
                {{ this.bridgeFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.facilityFlooded() }}</strong> –
                {{ this.facilityFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.about_bfe() }}</strong> –
                {{ this.baseFloodedTooltip() }}
              </li>
              <li>
                <strong>{{ this.uncategorized_a() }}</strong> –
                {{ this.uncategorizedTooltip() }}
              </li>
            </ul>
            <br />
            <p>
              {{ this.about_p4() }}
              <strong>{{ this.about_p4_bold() }}</strong>
              {{ this.about_p4_2() }}
            </p>
            <p>
              {{ this.about_p5() }}
            </p>
            <ul>
              <li>
                {{ this.about_li_01() }}
                <strong>{{ this.about_li_01_bold() }}</strong
                >{{ this.about_li_015() }}
              </li>
              <li>
                {{ this.view_la() }} <strong>{{ this.femaLayer() }}</strong
                >{{ this.about_li_02() }}
              </li>
              <li>
                {{ this.view_rt() }}
                <strong>{{ this.noaaRadarLayer() }}</strong>
              </li>
              <li>
                {{ this.view_rt_02() }}
                <strong>{{ this.noaaWatches() }}</strong>
                {{ this.allHaz() }}
              </li>
              <li>
                {{ this.view() }} <strong>{{ this.noaaWaterLevels() }}</strong>
              </li>
            </ul>
            <br />
            <p>{{ this.important() }}</p>
            <ul>
              <li>
                {{ this.about_li_03() }}
              </li>
              <li>
                {{ this.about_li_04() }}
              </li>
              <li>
                {{ this.about_li_05() }}
                <a
                  href="https://www.usgs.gov/usgs-science-centers#:~:text=USGS%20Science%20Centers%20%20%20%20Science%20Center,%20%20California%20%2022%20more%20rows%20"
                  >{{ this.waterScienceCenter() }}</a
                >
                {{ this.about_li_052() }}
              </li>
            </ul>
            <br />
            <p>
              <strong>{{ this.disclaimerTitle() }}</strong>
            </p>
            <p>
              {{ this.disclaimerText() }}
            </p>
            <p>
              {{ this.about_p6() }}
              <a href="mailto:gs_real_time_flood_impact_map_group@usgs.gov"
                >gs_real_time_flood_impact_map_group@usgs.gov.</a
              >
            </p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              {{ this.close() }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import { text } from "../mixins/text.js";

export default {
  mixins: [text],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>
#about {
  margin-left: auto;
}

#about-button-desktop,
#about-button-mobile {
  padding: 0;
  margin-left: 8px;
  height: 40px;
}

@media screen and (min-width: 640px) {
  #about-button-desktop {
    display: inline-flex;
  }
  #about-button-mobile {
    display: none;
  }
}

@media screen and (max-width: 900px) {
  #about-button-desktop {
    display: inline-flex;
    height: 28px;
  }
}

@media screen and (max-width: 640px) {
  #about-button-desktop {
    display: none;
  }
  #about-button-mobile {
    display: inline-flex;
    min-width: 28px;
    height: 28px;
  }
}
</style>
