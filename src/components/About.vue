<template>
    <div id="about">
        <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="1000"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                id="about-button-desktop"
            >
                <div style="color: #333;">About</div>
            </v-btn>
            <v-btn
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                id="about-button-mobile"
            >
                <v-icon small

                color="#333"
                >mdi-information</v-icon>
            </v-btn>
            </template>
    
            <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                About
            </v-card-title>
    
            <v-card-text>
                <p>Welcome to the USGS Real-time Flood Impact Map Viewer.</p>
                <p>This map viewer is used to convey points (known as Reference Points) of flood impacts at participating USGS real-time streamgages. The Real-time Flood Impact Map illustrates locations where stream/river embankments are flooded and also where man-made structures such as pedestrian walking trails, low lying areas along roadways, bridges, and facilities are flooding. USGS has over 10,000 streamgages nationwide in the continental US and US territories. Please note that not all USGS streamgages are represented in this map. If you are interested in adding Reference Points at/near an existing USGS streamgage in your area, please contact the USGS Water Science Center in your state.</p>
                <p>Although this product is not a Flood Warning System, it can be used to convey flood risks by illustrating locations where stream/river embankments are flooded and also locations with bridges are at risk of getting flooded.</p>
                <p>There are several resources provided in this product to guide the user in making information decisions about flooding and flood response. The map can also be used to:</p>
                <ul>
                    <li>View locations and obtain data at all USGS real-time streamgages</li>
                    <li>View locations of all National Weather Service Flood Forecast Sites</li>
                    <li>View National Weather Service Radar</li>
                    <li>View Flood Watches and Warning</li>
                    <li>View locations of real-time impacts of flood waters at or near participating USGS real-time streamgages, including,</li>
                    <ul>
                        <li>Embankment Flooded</li>
                        <li>Path Flooded</li>
                        <li>Road Flooded</li>
                        <li>Bridge Flood at Risk</li>
                        <li>Bridge Flooded</li>
                        <li>Structures Flooded</li>
                        <li>Locations experiencing the Federal Emergency Management Agency (FEMA) 100-year Base Flood Elevation (also known as the 1% annual chance flood)</li>
                        <li>Other Reference Points</li>
                    </ul>
                </ul>
            </v-card-text>
    
            <v-divider></v-divider>
    
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                text
                @click="dialog = false"
                >
                Close
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
    </div>
</template>

<script>

import '@mdi/font/css/materialdesignicons.css'

export default {
    data() {
        return {
            dialog: false,
        };
    },
}
</script>

<style>

#about {
    margin-left: auto;
}

#about-button-desktop, #about-button-mobile {
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

@media screen and (max-width: 828px) {
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