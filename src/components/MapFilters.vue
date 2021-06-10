<template>
  <v-expansion-panels>
    <!-- Filters Section -->
    <v-expansion-panel>
      <v-expansion-panel-header>
        Streamgages
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="px-0" fluid>
        <!-- these are not actually linked to anything right now, just an example of what is possible! -->
            <input type="checkbox" id="stream" value="Stream" v-model="picked" />
              <label for="stream">Real-time Stream Gage</label>
              <br/>
            <input type="checkbox" id="rain" value="Rain" v-model="picked" />
              <label for="rain">Real-time Rain Gage</label>
              <br/>
            <input type="checkbox" id="tidal" value="Tidal" v-model="picked" />
              <label for="tidal">Tidal Gage</label>
              <br/>
              <span>Checked Gages: {{ picked }}</span>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    data () {
      return {
        picked: [],
      }
    },
  }
</script>