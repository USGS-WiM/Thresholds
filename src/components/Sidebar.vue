<template>
  <v-navigation-drawer
    v-model="drawerState"
    disable-resize-watcher
    app
    :width="300"
  >
    <div>
      <h2 id="sidebarTitle">Map Filters</h2>
      <MapFilters></MapFilters>
    </div>
    <div id="disclaimerText">
        <h5>Provisional Data Statement</h5>
        <p>U.S. Geological Survey data presented in this viewer are provisional and subject to revision until they have been thoroughly reviewed and received final approval. Real-time data relayed by satellite or other telemetry are automatically screened to not display improbable values until they can be verified. Provisional data may be inaccurate due to instrument malfunctions or physical changes at the measurement site. Subsequent review based on field inspections and measurements may result in significant revisions to the data.</p>
        <p>Data users are cautioned to consider carefully the provisional nature of the information before using it for decisions that concern persona or public safety or the conduct of business that involves substantial monetary or operational consequences. Information concerning the accuracy and appropriate uses of these data or concerning other hydrologic data may be obtained from the USGS.</p>
    </div>
  </v-navigation-drawer>
</template>

<style>
@import "../styles/custom.less";

#disclaimerText {
  margin: 10px;
}

#disclaimerText p {
  font-size: 11px;
}

</style>

<script>
// imports
import MapFilters from "../components/MapFilters";

export default {
  name: "NavigationDrawer",
  components: {
    MapFilters,
  },
  computed: {
    drawerState: {
      get() {
        return this.$store.getters.drawerState;
      },
      set(v) {
        return this.$store.commit("toggleDrawerState", v);
      },
    },
  },
};
</script>
