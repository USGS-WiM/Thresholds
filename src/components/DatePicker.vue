<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          v-on:click:prepend="menu = true"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="2021-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
//imports
import { text } from "../mixins/text";


export default {
  mixins: [text],
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "DATE"));
    },
  },
  methods: {
    setInitialDate() {
      let date = new Date();
      // setting end date values
      let day = date.getDate().toString();
      let month = date.getMonth() + 1;
      month = month.toString();
      let year = date.getFullYear().toString();

      // adding zeros if needed
      month = this.addZeroToDate(month);
      day = this.addZeroToDate(day);

      const fulldate = year + "-" + month + "-" + day;
      this.date = fulldate;
    },
    save(date) {
      let dateObject = new Date(date);
      dateObject.setDate(dateObject.getDate() + 1);

      // subtracting days for enddate
      let startDate = new Date(dateObject.getTime() - 6 * 24 * 60 * 60 * 1000);

      // getting start date values
      let endYear = date.slice(0, 4);
      let endMonth = date.slice(5, 7);
      let endDay = date.slice(8, 11);

      // setting end date values
      let startday = startDate.getDate().toString();
      let startmonth = startDate.getMonth() + 1;
      startmonth = startmonth.toString();
      let startyear = startDate.getFullYear().toString();

      // adding zeros if needed
      startmonth = this.addZeroToDate(startmonth);
      startday = this.addZeroToDate(startday);

      // setting time period for request
      let timeperiod =
        "&&startDT=" +
        startyear +
        "-" +
        startmonth +
        "-" +
        startday +
        "&endDT=" +
        endYear +
        "-" +
        endMonth +
        "-" +
        endDay;

      this.timePeriodValue = timeperiod;
      this.$refs.menu.save(date);

      // Remove radar layer if it's not today's date
      if (this.isToday(dateObject)) {
        if (this.$store.state.radarState == false) {
          this.$store.state.radarState = true;
        }
      } else {
        if (this.$store.state.radarState == true) {
          this.$store.state.radarState = false;
        }
      }
    },
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      );
    },
    addZeroToDate(num) {
      let fixedNum;
      let length = num.length;
      if (length === 1) {
        fixedNum = "0" + num;
      } else {
        fixedNum = num;
      }
      return fixedNum;
    },
  },
  mounted() {
    this.setInitialDate();
  },
  computed: {
    timePeriodValue: {
      get() {
        return this.$store.state.selectedTimePeriodState;
      },
      set(value) {
        return this.$store.commit("getSelectedTimePeriodState", value);
      },
    },
  },
};
</script>
