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
                >mdi mdi-information</v-icon>
            </v-btn>
            </template>
    
            <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                About
            </v-card-title>
    
            <v-card-text>
                <h4>Welcome to the USGS Real-Time Flood Impact Map</h4>
                <p>The Real-Time Flood Impact Map displays the locations (called “Flood Impact Locations”) where the USGS has measured the height of critical safety or infrastructure features that may be vulnerable to flood impacts. Some examples of flood impact locations include stream and river embankments; roads and bridges; pedestrian paths; buildings; and more.</p>
                <p>Flood Impact Locations are surveyed and associated with a nearby USGS real-time streamgage. When the streamgage water level (or gage height) exceeds the Flood Impact Location’s surveyed height, its icon will display on the map, showing that this location may be currently flooded. When you click on the icon, the pop-up will display the current gage height and the Flood Impact Location height, so you can compare how close that location is to the current water level. Some Flood Impact Locations may be measured below the level of actual flooding to provide an early warning that flooding may be imminent.</p>
                <p>The following are the flood impact icon descriptions currently represented:</p>
                <ul>
                    <li><strong>Embankment Flooded</strong> – Flood waters are overflowing the stream/river channel and into the surrounding area.</li>
                    <li><strong>Path Flooded</strong> – Pedestrian greenway/trail/path is underwater.</li>
                    <li><strong>Road Flooded</strong> – Road is underwater. </li>
                    <li><strong>Bridge Flood at Risk</strong> – Water from the river or stream has reached the bottom of the bridge.</li>
                    <li><strong>Bridge Flooded</strong> – Bridge is underwater.</li>
                    <li><strong>Structures Flooded</strong> – Bridge is underwater.</li>
                    <li><strong>FEMA 100-year BFE</strong> – The FEMA 100-year Base Flood Elevation (BFE) has been reached.</li>
                    <li><strong>Uncategorized</strong> – This Flood Impact Location is experiencing flooding. For more information about this location, open the icon’s pop-up and look for the “Flood Impact Type” description.</li>
                </ul>
                <br>
                <p>The white circles on the map represent <strong>all Flood Impact Locations</strong> that have been measured but are not currently flooding. You can use the date picker to retroactively view Active Flood Locations of any 7-day period within the last calendar year.</p>
                <p>Although this mapper is not a flood warning system, it can be used to convey immediate flood risks by showing the locations where flooding may be currently or soon occurring. These additional flood information layers can be used to provide additional context:</p>
                <ul>
                    <li>View locations and real-time hydographs for all USGS <strong>real-time streamgages</strong>, even those that do not have any associated Flood Impact Locations yet (must be zoomed in to level 9). Connect to USGS Water Data for the Nation for additional data.</li>
                    <li>View <strong>FEMA National Flood Hazard Layer</strong>, including National Flood Insurance Program flood maps and flood probability designations</li>
                    <li>View real-time <strong>NOAA National Weather Service Radar</strong></li>
                    <li>View real-time <strong>NOAA National Weather Service Watches and Warnings</strong> (all hazards)</li>
                    <li>View <strong>NOAA Tides and Water Level Stations</strong></li> 
                </ul>
                <br>
                <p>Some important things to know:</p>
                <ul>
                    <li>The flood impact status reporting is based on the USGS streamgage near the Flood Impact Location. If the streamgage malfunctions, or stops returning data due to damage or overtopping by floodwaters, this map may not correctly report potential flooding.</li>
                    <li>Users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern personal or public safety, or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.</li>
                    <li>The USGS has over 10,000 streamgages nationwide in the continental U.S. and U.S. territories. Please note: flood impacts have not been collected at all USGS streamgages. Additional Flood Impact Locations will continue to be added. If you would like to have flood impact locations collected at or near an existing USGS streamgage in your area, please contact the <a href="https://www.usgs.gov/usgs-science-centers#:~:text=USGS%20Science%20Centers%20%20%20%20Science%20Center,%20%20California%20%2022%20more%20rows%20">USGS Water Science Center</a> in your state.</li>
                </ul>
                <br>
                <p><strong>Disclaimer for streamgage data:</strong></p>
                <p>Data provided by the USGS real-time streamgages presented in this map are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.</p>
                <p>For site specific information please contact the local USGS Water Science Center. For other inquiries, please contact our team at <a href="mailto:usgs-Realtime-Flood-Impact-Map@doimspp.onmicrosoft.com">usgs-Realtime-Flood-Impact-Map@doimspp.onmicrosoft.com</a>.</p>
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