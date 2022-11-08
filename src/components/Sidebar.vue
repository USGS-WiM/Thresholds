<template>
  <v-navigation-drawer
    v-model="drawerState"
    disable-resize-watcher
    app
    :width="350"
  >
    <div>
      <h2 id="sidebarTitle">{{ this.sidebarTitle() }}</h2>
      <MapFilters></MapFilters>
    </div>
    <div id="disclaimerText">
      <h5>{{ this.dataStatement() }}</h5>
      <p>{{ this.dataStatementText() }}</p>
      <p>{{ this.dataStatementText2() }}</p>
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
import { text } from "../mixins/text.js";

export default {
  mixins: [text],
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
