export const text = {
    watch: { // watching for spanishState change and then running methods for translating if state has changed
        "$store.state.spanishState": function () {
            this.title();
            this.about();
            this.long()
            this.latitude();
            this.zoomControl();
            this.reset();
        }
    },
    methods: { // If Spanish State is true then display Spanish text; if false display English
        title() {
            return this.$store.state.spanishState == true ? 'Mapa de impacto de inundaciones en tiempo real' : 'Real-Time Flood Impact Map';
        },
        pilot() {
            return this.$store.state.spanishState == true ? 'piloto' : 'pilot';
        },
        sidebarTitle() {
            return this.$store.state.spanishState == true ? 'Filtros de mapas' : 'Map Filters';
        },
        noFloodingAlert() {
            return this.$store.state.spanishState == true ? 'No hay rasgos de inundación' : 'No Flooded Features';
        },
        basemaps() {
            return this.$store.state.spanishState == true ? 'Mapas base' : 'Basemaps';
        },
        streets() {
            return this.$store.state.spanishState == true ? 'Calles' : 'Streets';
        },
        satellite() {
            return this.$store.state.spanishState == true ? 'Satélite' : 'Satellite';
        },
        topo() {
            return this.$store.state.spanishState == true ? 'Topografía' : 'Topo';
        },
        terrain() {
            return this.$store.state.spanishState == true ? 'Terreno' : 'Terrain';
        },
        gray() {
            return this.$store.state.spanishState == true ? 'Gris' : 'Gray';
        },

        layers() {
            return this.$store.state.spanishState == true ? 'Capas con información' : 'Layers';
        },
        noActiveFlooding() {
            return this.$store.state.spanishState == true ? 'No hay inundación activa' : 'No Active Flooding';
        },
        embankmentFlooded() {
            return this.$store.state.spanishState == true ? 'Terraplén inundado' : 'Embankment Flooded';
        },
        pathFlooded() {
            return this.$store.state.spanishState == true ? 'Sendero inundado' : 'Path Flooded';
        },
        roadFlooded() {
            return this.$store.state.spanishState == true ? 'Carretera inundada' : 'Road Flooded';
        },
        bridgeFloodRisk() {
            return this.$store.state.spanishState == true ? 'Puente en peligro de inundación' : 'Bridge Flood At Risk';
        },
        bridgeFlooded() {
            return this.$store.state.spanishState == true ? 'Puente inundado' : 'Bridge Flooded';
        },
        facilityFlooded() {
            return this.$store.state.spanishState == true ? 'Instalación inundada' : 'Facility Flooded';
        },
        baseFloodElevation() {
            return this.$store.state.spanishState == true ? 'Elevación Base de Inundación' : 'Base Flood Elevation';
        },
        uncategorized() {
            return this.$store.state.spanishState == true ? 'No clasificado' : 'Uncategorized';
        },
        allFeatures() {
            return this.$store.state.spanishState == true ? 'Todas las características' : 'All Features';
        },
        noActiveFloodingTooltip() {
            return this.$store.state.spanishState == true ? 'Las capas de abajo están deshabilitadas porque no hay lugares que se estén inundando actualmente. Cambie la fecha de arriba para ver posibles inundaciones en fechas anteriores.' : 'The layers below are disabled because no locations are currently flooding. Change the date above to view possible flooding in past dates. ';
        },
        embankmentFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'Las aguas de la inundación están desbordando el cauce del arroyo o río y en la zona circundante.' : 'Flood waters are overflowing the stream/river channel and into the surrounding area.';
        },
        pathFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'La vía verde/sendero/camino peatonal está bajo el agua.' : 'Pedestrian greenway/trail/path is underwater.';
        },
        roadFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'La carretera está bajo el agua.' : 'Road is underwater.';
        },
        bridgeAtRiskTooltip() {
            return this.$store.state.spanishState == true ? 'El agua del río o arroyo ha llegado a la parte inferior del puente.' : 'Water from the river or stream has reached the bottom of the bridge.';
        },
        bridgeFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'El puente está bajo el agua.' : 'Bridge is underwater.';
        },
        facilityFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'El agua del río o arroyo ha alcanzado el nivel más bajo del piso terminado de la estructura (Elevación del piso terminado de la Agencia Federal para el Manejo de Emergencias o FFE, por sus siglas en inglés)' : 'Water from the river or stream has reached the lowest finished floor of the structure (FEMA Finished Floor Elevation, or FFE).';
        },
        baseFloodedTooltip() {
            return this.$store.state.spanishState == true ? 'Se ha alcanzado la Elevación Base de Inundación (BFE, por sus siglas en inglés) de 100 años de la Agencia Federal para el Manejo de Emergencias.' : 'The FEMA 100-year Base Flood Elevation (BFE) has been reached.';
        },
        uncategorizedTooltip() {
            return this.$store.state.spanishState == true ? 'Esta ubicación de impacto de inundación está experimentando una inundación. Para obtener más información sobre esta ubicación, abra la ventana emergente del icono y busque la descripción “Tipo de impacto de la inundación”.' : 'This Flood Impact Location is experiencing flooding. For more information about this location, open the icon’s pop-up and look for the “Flood Impact Type” description.';
        },
        opacity() {
            return this.$store.state.spanishState == true ? 'Opacidad' : 'Opacity';
        },
        streamgageDesc() {
            return this.$store.state.spanishState == true ? 'Los medidores de flujo de corrientes de agua en tiempo real del USGS, están disponibles a partir del nivel 9 de zoom. Por favor, amplíe la imagen para verlos.' : 'USGS Real-time Streamgages available at zoom level 9 and above. Please zoom in to view.';
        },
        streamgageLabel() {
            return this.$store.state.spanishState == true ? 'Medidores de flujo de corrientes de agua en tiempo real del USGS' : 'USGS Real-time Streamgage';
        },
        addFloodLayers() {
            return this.$store.state.spanishState == true ? 'Capas con información de inundación adicionales' : 'USGS Real-time Streamgage';
        },
        femaLayer() {
            return this.$store.state.spanishState == true ? 'Capa con información de riesgo de inundación nacional de la Agencia Federal para el Manejo de Emergencias' : 'FEMA National Flood Hazard Layer';
        },
        noaaRadarLayer() {
            return this.$store.state.spanishState == true ? 'Radar del Servicio Meteorológico Nacional de la Oficina Nacional de Administración Oceánica y Atmosférica' : 'NOAA National Weather Service Radar';
        },
        noaaFloodLayer() {
            return this.$store.state.spanishState == true ? 'Vigilancia y advertencias de inundación de la Oficina Nacional de Administración Oceánica y Atmosférica' : 'NOAA Flood Watches and Warnings';
        },
        supportingLayers() {
            return this.$store.state.spanishState == true ? 'Capas con información de apoyo' : 'Supporting Layers';
        },
        noaaTides() {
            return this.$store.state.spanishState == true ? 'Estaciones de mareas y corrientes de la Oficina Nacional de Administración Oceánica y Atmosférica' : 'NOAA Tides and Current Stations';
        },
        dataStatement() {
            return this.$store.state.spanishState == true ? 'Declaración de datos provisionales' : 'Provisional Data Statement';
        },
        dataStatementText() {
            return this.$store.state.spanishState == true ? 'Los datos del Servicio Geológico de los Estados Unidos presentados en este visualizador son provisionales y están sujetos a revisión hasta que hayan sido examinados a fondo y hayan recibido la aprobación final. Los datos en tiempo real transmitidos por satélite u otro tipo de telemetría son filtradas automáticamente para no mostrar valores improbables hasta que puedan ser verificados. Los datos provisionales pueden ser inexactos debido a un mal funcionamiento de los instrumentos o a cambios físicos en la ubicación de la medición. Una revisión posterior basada en inspecciones y mediciones sobre el terreno puede resultar en revisiones significativas de los datos.' : 'U.S. Geological Survey data presented in this viewer are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.';
        },
        dataStatementText2() {
            return this.$store.state.spanishState == true ? 'Se les advierte a los usuarios de los datos que consideren cuidadosamente el carácter provisional de la información antes de utilizarla para tomar decisiones que afecten a la seguridad personal o pública o a la realización de negocios que impliquen importantes consecuencias monetarias u operativas. La información relativa a la exactitud y a los usos apropiados de estos datos o de otros datos hidrológicos puede obtenerse en el USGS.' : 'Data users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern personal or public safety or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.';
        },
        about() {
            let element = document.getElementById('aboutButton');
            if (this.$store.state.spanishState == true) {
                element.innerHTML = 'Acerca de'
            }
            else {
                element.innerHTML = 'About'
            }
        },
        search() {
            return this.$store.state.spanishState == true ? 'Buscar' : 'Search';
        },
        latitude() {
            let element = document.getElementById('lat');
            if (this.$store.state.spanishState == true) {
                element.innerHTML = 'Latitud:'
            }
            else {
                element.innerHTML = 'Latitude:'
            }
        },

        long() {
            let element = document.getElementById('long');
            if (this.$store.state.spanishState == true) {
                element.innerHTML = 'Longitud:'
            }
            else {
                element.innerHTML = 'Longitude:'
            }
        },
        zoomControl() {
            let element = document.getElementById('zoom');
            if (this.$store.state.spanishState == true) {
                element.innerHTML = 'Zoom actual:'
            }
            else {
                element.innerHTML = 'Current Zoom:'
            }
        },
        legend() {
            return this.$store.state.spanishState == true ? 'Leyenda' : 'Legend';
        },

        close() {
            return this.$store.state.spanishState == true ? 'Cerrar' : 'Close';
        },
        about_h4() {
            return this.$store.state.spanishState == true ? 'Bienvenido al Mapa de Impacto de Inundaciones en Tiempo Real del USGS' : 'Welcome to the USGS Real-Time Flood Impact Map';
        },
        about_p1() {
            return this.$store.state.spanishState == true ? 'El Mapa de Impacto de Inundaciones en Tiempo Real muestra las ubicaciones (llamadas “Ubicaciones de Impacto de Inundaciones”) donde el USGS ha medido la altura de características críticas de seguridad o infraestructura que pueden ser vulnerables a los impactos de las inundaciones. Algunos ejemplos de ubicaciones de impacto de inundaciones incluyen terraplenes de arroyos y ríos; carreteras y puentes; caminos peatonales; edificios; y más.' : 'The Real-Time Flood Impact Map displays the locations (called “Flood Impact Locations”) where the USGS has measured the height of critical safety or infrastructure features that may be vulnerable to flood impacts. Some examples of flood impact locations include stream and river embankments; roads and bridges; pedestrian paths; buildings; and more.';
        },
        about_p2() {
            return this.$store.state.spanishState == true ? 'Se estudian y se asocian los lugares de impacto de las inundaciones con un medidor de flujo en tiempo real cercano, del USGS. Cuando el nivel de agua del medidor de flujo (o la altura de referencia) supera la altura del punto de impacto de la inundación, se mostrará su icono en el mapa, mostrando que esta ubicación puede estar inundada actualmente. Al hacer clic en el icono, la ventana emergente mostrará la altura del indicador actual y la altura de la ubicación de impacto de la inundación, para que pueda comparar la proximidad de ese lugar con el nivel de agua actual. Algunas ubicaciones de impacto de inundación pueden medirse por debajo del nivel de la inundación real para proporcionar una advertencia temprana de que la inundación puede ser inminente.' : 'Flood Impact Locations are surveyed and associated with a nearby USGS real-time streamgage. When the streamgage water level (or gage height) exceeds the Flood Impact Location’s surveyed height, its icon will display on the map, showing that this location may be currently flooded. When you click on the icon, the pop-up will display the current gage height and the Flood Impact Location height, so you can compare how close that location is to the current water level. Some Flood Impact Locations may be measured below the level of actual flooding to provide an early warning that flooding may be imminent.';
        },
        about_p3() {
            return this.$store.state.spanishState == true ? 'Se muestran a continuación las descripciones de los iconos de impacto de inundación representados actualmente:' : 'The following are the flood impact icon descriptions currently represented:';
        },
        about_p4() {
            return this.$store.state.spanishState == true ? 'Los círculos blancos en el mapa representan todas las ubicaciones' : 'The white circles on the map represent';

        },
        about_p4_bold() {
            return this.$store.state.spanishState == true ? 'de impacto de inundación' : 'all Flood Impact Locations';

        },
        about_p4_2() {
            return this.$store.state.spanishState == true ? 'que se han medido pero que no se están inundando actualmente. Puede utilizar el selector de fechas para ver con carácter retroactivo los puntos de inundación activos durante cualquier período de 7 días dentro del último año natural.' : 'that have been measured but are not currently flooding. You can use the date picker to retroactively view Active Flood Locations of any 7-day period within the last calendar year.';

        },
        about_p5() {
            return this.$store.state.spanishState == true ? 'Aunque este mapa no es un sistema de advertencia de inundaciones, puede utilizarse para transmitir los riesgos inmediatos de inundación al mostrar los lugares en los que pueden producirse inundaciones actualmente o en breve. Estas capas adicionales de información sobre inundaciones pueden utilizarse para proporcionar un contexto adicional:' : 'Although this mapper is not a flood warning system, it can be used to convey immediate flood risks by showing the locations where flooding may be currently or soon occurring. These additional flood information layers can be used to provide additional context:';

        },
        about_li_01() {
            return this.$store.state.spanishState == true ? 'Ver las ubicaciones y los hidrogramas en tiempo real de todos ' : 'View locations and real-time hydographs for all USGS';

        },
        about_li_01_bold() {
            return this.$store.state.spanishState == true ? 'los medidores de flujo de corrientes de agua ' : 'real-time streamgages';

        },
        about_li_015() {
            return this.$store.state.spanishState == true ? 'del USGS, incluso aquellos que aún no tienen ninguna ubicación de impacto de inundación asociada (debe ser ampliado al nivel 9 del zoom). Conéctese a USGS Water Data for the Nation para obtener datos adicionales.' : ', even those that do not have any associated Flood Impact Locations yet (must be zoomed in to level 9). Connect to USGS Water Data for the Nation for additional data.';

        },
        about_bfe() {
            return this.$store.state.spanishState == true ? 'La elevación base de inundación (BFE, por sus siglas en inglés) de 100 años de la Agencia Federal para el Manejo de Emergencias' : 'FEMA 100-year BFE';

        },
        view() {
            return this.$store.state.spanishState == true ? 'Ver' : 'View';

        },

        view_la() {
            return this.$store.state.spanishState == true ? 'Ver la' : 'View';

        },
        about_li_02() {
            return this.$store.state.spanishState == true ? ', incluyendo los mapas de inundación del Programa Nacional de Seguros contra Inundaciones y las designaciones de probabilidad de inundación' : ', including National Flood Insurance Program flood maps and flood probability designations';

        },
        view_rt() {
            return this.$store.state.spanishState == true ? 'Ver en tiempo real la' : 'View real-time';

        },
        view_rt_02() {
            return this.$store.state.spanishState == true ? 'Ver en tiempo real las vigilancias y advertencias del' : 'View real-time';

        },
        allHaz() {
            return this.$store.state.spanishState == true ? '(todos los peligros)' : '(all hazards)';

        },
        noaaWatches() {
            return this.$store.state.spanishState == true ? 'Servicio Meteorológico Nacional de la Oficina Nacional de Administración Oceánica y Atmosférica' : 'NOAA National Weather Service Watches and Warnings';

        },
        noaaWaterLevels() {
            return this.$store.state.spanishState == true ? 'las estaciones de mareas y niveles de agua de la Oficina Nacional de Administración Oceánica y Atmosférica' : 'NOAA Tides and Water Level Stations';

        },
        important() {
            return this.$store.state.spanishState == true ? 'Algunas cosas importantes que debe saber:' : 'Some important things to know:';

        },
        about_li_03() {
            return this.$store.state.spanishState == true ? 'El informe del estado del impacto de la inundación se basa en el medidor de flujo de corrientes del USGS cerca de la ubicación del impacto de la inundación. Si el medidor de flujo no funciona correctamente o deja de enviar datos debido a daños o desbordamiento por inundaciones, es posible que este mapa no informe correctamente sobre posibles inundaciones.' : 'The flood impact status reporting is based on the USGS streamgage near the Flood Impact Location. If the streamgage malfunctions, or stops returning data due to damage or overtopping by floodwaters, this map may not correctly report potential flooding.';

        },
        about_li_04() {
            return this.$store.state.spanishState == true ? 'Se advierte a los usuarios que consideren cuidadosamente el carácter provisional de la información antes de utilizarla para tomar decisiones que afecten a la seguridad personal o pública, o para llevar a cabo negocios que impliquen importantes consecuencias monetarias u operativas. La información relativa a la exactitud y los usos apropiados de estos datos o los relativos a otros datos hidrológicos pueden ser obtenidos del USGS.' : 'Users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern personal or public safety, or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.';

        },
        about_li_05() {
            return this.$store.state.spanishState == true ? 'El USGS cuenta con más de 10,000 medidores de flujo de corrientes en todo el país en los Estados Unidos continentales y en los territorios de los Estados Unidos. Por favor, tenga en cuenta que no se han recopilado los impactos de las inundaciones en todos los medidores de flujo de corrientes del USGS. Se seguirán añadiendo ubicaciones de impacto de inundación adicionales. Si desea que se recopilen ubicaciones de impacto de inundaciones en o cerca de un medidor de flujo de corrientes del USGS en su área, póngase en contacto con el' : 'The USGS has over 10,000 streamgages nationwide in the continental U.S. and U.S. territories. Please note: flood impacts have not been collected at all USGS streamgages. Additional Flood Impact Locations will continue to be added. If you would like to have flood impact locations collected at or near an existing USGS streamgage in your area, please contact the';

        },
        waterScienceCenter() {
            return this.$store.state.spanishState == true ? 'Centro de Ciencias del Agua del USGS' : 'USGS Water Science Center';

        },
        about_li_052() {
            return this.$store.state.spanishState == true ? '(sitio web solo en inglés) de su estado.' : ' in your state.';

        },
        disclaimerTitle() {
            return this.$store.state.spanishState == true ? 'Descargo de responsabilidad para los datos de los medidores de flujo de corrientes de agua:' : 'Disclaimer for streamgage data: ';

        },
        disclaimerText() {
            return this.$store.state.spanishState == true ? 'Los datos proporcionados por los medidores de flujo de corrientes en tiempo real del USGS presentados en este mapa son provisionales y están sujetos a revisión hasta que hayan sido examinados a fondo y hayan recibido la aprobación final. Los datos en tiempo real transmitidos por satélite u otro tipo de telemetría son filtrados automáticamente para no mostrar valores improbables hasta que puedan ser verificados. Los datos provisionales pueden ser inexactos debido a un mal funcionamiento de los instrumentos o a cambios físicos en la ubicación de la medición. Una revisión posterior basada en inspecciones y mediciones sobre el terreno puede resultar en revisiones significativas de los datos.' : 'Data provided by the USGS real-time streamgages presented in this map are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.';

        },
        spanishDislaimer() {
            return this.$store.state.spanishState == true ? 'Traducción al español proporcionada por el National Language Service Corps.' : 'Spanish translation provided by the National Language Service Corps.';
        },
        about_p6() {
            return this.$store.state.spanishState == true ? 'Para obtener información específica del lugar, por favor póngase en contacto con el Centro local de Ciencias del Agua del USGS. Para otras consultas, por favor póngase en contacto con nuestro equipo en:' : 'For site specific information please contact the local USGS Water Science Center. For other inquiries, please contact our team at';

        },

        activeFlooding() {
            return this.$store.state.spanishState == true ? 'Inundación activa' : 'Active Flooding';
        },

        reset() {
            let element = document.getElementById('resetbutton');
            if (this.$store.state.spanishState == true) {
                element.innerHTML = 'Restablecer la vista'
            }
            else {
                element.innerHTML = 'Reset View'
            }
        },
        siteLayers() {
            return this.$store.state.spanishState == true ? 'Capas de información del sitio' : 'Site Layers ';
        },
        activeLayers() {
            return this.$store.state.spanishState == true ? 'Capas de información de inundación activa' : 'Active Flooding Layers';
        },
        showActive() {
            return this.$store.state.spanishState == true ? 'Mostrar todas las capas de información de inundación activa' : 'Show all Active flooding Layers';
        },
        dateText() {

            return this.$store.state.spanishState == true ? 'Fecha' : 'Date';
        },
        uncategorized_a() {
            return this.$store.state.spanishState == true ? 'No classificada' : 'Uncategorized';
        },
        displaying_all_features() {
            return this.$store.state.spanishState == true ? 'Mostrando todas las características' : 'Displaying all features';
        }
    }
}
