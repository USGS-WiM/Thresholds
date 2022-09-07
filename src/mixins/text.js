export const text = {
    watch: { // watching for spanishState change and then running methods for translating if state has changed
        "$store.state.spanishState": function () {
            console.log("translating");
            this.title();
        }
    },
    methods: { // If Spanish State is true then display Spanish text; if false display English
        title() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Real-Time Flood Impact Map';
        },
        sidebarTitle() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Map Filters';
        },
        noFloodingAlert() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'No Flooded Features';
        },
        basemaps() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Basemaps';
        },
        streets() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Streets';
        },
        satellite() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Satellite';
        },
        topo() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Topo';
        },
        terrain() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Terrain';
        },
        gray() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Gray';
        },
        natGeo() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NatGeo';
        },
        layers() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Layers';
        },
        noActiveFlooding() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'No Active Flooding';
        },
        embankmentFlooded() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Embankment Flooded';
        },
        pathFlooded() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Path Flooded';
        },
        roadFlooded() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Road Flooded';
        },
        bridgeFloodRisk() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Bridge Flood At Risk';
        },
        bridgeFlooded() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Bridge Flooded';
        },
        facilityFlooded() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Facility Flooded';
        },
        baseFloodElevation() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Base Flood Elevation';
        },
        uncategorized() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Uncategorized';
        },
        allFeatures() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'All Features';
        },
        noActiveFloodingTooltip(){
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The layers below are disabled because no locations are currently flooding. Change the date above to view possible flooding in past dates. ';
        },
        embankmentFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Flood waters are overflowing the stream/river channel and into the surrounding area.';
        },
       pathFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Pedestrian greenway/trail/path is underwater.';
        },
        roadFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Road is underwater.';
        },
        bridgeAtRiskTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Water from the river or stream has reached the bottom of the bridge.';
        },
        bridgeFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Bridge is underwater.';
        },
        facilityFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Water from the river or stream has reached the lowest finished floor of the structure (FEMA Finished Floor Elevation, or FFE).';
        },
        baseFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The FEMA 100-year Base Flood Elevation (BFE) has been reached.';
        },
        uncategorizedTooltip() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'This Flood Impact Location is experiencing flooding. For more information about this location, open the icon’s pop-up and look for the “Flood Impact Type” description.';
        },
        opacity() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Opacity';
        },
        streamgageDesc() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'USGS Real-time Streamgages available at zoom level 9 and above. Please zoom in to view.';
        },
        streamgageLabel() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'USGS Real-time Streamgage';
        },
        addFloodLayers() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'USGS Real-time Streamgage';
        },
        femaLayer() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'FEMA National Flood Hazard Layer';
        },
        noaaRadarLayer() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NOAA National Weather Service Radar';
        },
        noaaFloodLayer() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NOAA Flood Watches and Warnings';
        },
        supportingLayers() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Supporting Layers';
        },
        noaaTides() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NOAA Tides & Currents';
        },
        dataStatement() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Provisional Data Statement';
        },
        dataStatementText() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'U.S. Geological Survey data presented in this viewer are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.';
        },
        dataStatementText2() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Data users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern personal or public safety or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.';
        },

        
        about() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'About';
        },
        search() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Search';
        },

        














        

        latitude() {
            let lat = document.getElementById('lat')
            return this.$store.state.spanishState == true ? lat.innerHTML = 'PLACEHOLDER FOR SPANISH TEXT' : lat.innerHTML = 'hi hannah:';
        },
        longitude() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Longitude:';
        },
        currentZoom() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Current Zoom:';
        },
        legend() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Legend';
        },
        //not sure we need this one... i think the abbreviation for miles will be the same thing
        scale() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Search';
        },
        close() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Close';
        },
        about_h4() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Welcome to the USGS Real-Time Flood Impact Map';
        },
        about_p1() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The Real-Time Flood Impact Map displays the locations (called “Flood Impact Locations”) where the USGS has measured the height of critical safety or infrastructure features that may be vulnerable to flood impacts. Some examples of flood impact locations include stream and river embankments; roads and bridges; pedestrian paths; buildings; and more.';
        },
        about_p2() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Flood Impact Locations are surveyed and associated with a nearby USGS real-time streamgage. When the streamgage water level (or gage height) exceeds the Flood Impact Location’s surveyed height, its icon will display on the map, showing that this location may be currently flooded. When you click on the icon, the pop-up will display the current gage height and the Flood Impact Location height, so you can compare how close that location is to the current water level. Some Flood Impact Locations may be measured below the level of actual flooding to provide an early warning that flooding may be imminent.';
        },
        about_p3() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The following are the flood impact icon descriptions currently represented:';
        },
        about_p4() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The white circles on the map represent';

        },
        about_p4_bold() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'all Flood Impact Locations';
            
        },
        about_p4_2() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'that have been measured but are not currently flooding. You can use the date picker to retroactively view Active Flood Locations of any 7-day period within the last calendar year.';
            
        },
        about_p5() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Although this mapper is not a flood warning system, it can be used to convey immediate flood risks by showing the locations where flooding may be currently or soon occurring. These additional flood information layers can be used to provide additional context:';
            
        },
        about_li_01() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'View locations and real-time hydographs for all USGS';
            
        },
        about_li_01_bold() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'real-time streamgages';
            
        },
        about_li_015() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : ', even those that do not have any associated Flood Impact Locations yet (must be zoomed in to level 9). Connect to USGS Water Data for the Nation for additional data.';
            
        },
        view() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'View';
            
        },
        about_li_02() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : ', including National Flood Insurance Program flood maps and flood probability designations';
            
        },
        view_rt() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'View real-time';
            
        },
        allHaz() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : '(all hazards)';
            
        },
        noaaWatches() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NOAA National Weather Service Watches and Warnings';
            
        },
        noaaWaterLevels() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'NOAA Tides and Water Level Stations';
            
        },
        important() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Some important things to know:';
            
        },
        about_li_03() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The flood impact status reporting is based on the USGS streamgage near the Flood Impact Location. If the streamgage malfunctions, or stops returning data due to damage or overtopping by floodwaters, this map may not correctly report potential flooding.';
            
        }, 
        about_li_04() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern personal or public safety, or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.';
            
        }, 
        about_li_05() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'The USGS has over 10,000 streamgages nationwide in the continental U.S. and U.S. territories. Please note: flood impacts have not been collected at all USGS streamgages. Additional Flood Impact Locations will continue to be added. If you would like to have flood impact locations collected at or near an existing USGS streamgage in your area, please contact the';
            
        }, 
        waterScienceCenter() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'USGS Water Science Center';
            
        }, 
        about_li_052() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : ' in your state.';
            
        }, 
        disclaimerTitle() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Disclaimer for streamgage data: ';
            
        },
        disclaimerText() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Data provided by the USGS real-time streamgages presented in this map are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.';
            
        },
        about_p6() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'For site specific information please contact the local USGS Water Science Center. For other inquiries, please contact our team at';
            
        },
        about_p6_link() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'gs_real_time_flood_impact_map_group@usgs.gov.';
            
        },
        femaBFE() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'FEMA 100-year BFE';
        },
        activeFlooding() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Active Flooding';
        },
    

        

       
        


        
        
        

        

    }
}
