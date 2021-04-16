<template>
    <v-app id="inspire">
        <v-app-bar app light>
            <v-toolbar-title>
                Widget example using <a href="https://vue-chartjs.org/">vue-ChartJs</a> & <a href="https://www.chartjs.org/">ChartJS</a>
            </v-toolbar-title>
            <v-spacer />
            <v-btn class="ma-2" text icon @click="showDialog(true)">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="text-center">
                        <span>{{ message }}</span>
                        <div class="my-toolbar">
                            <v-slider v-model="chartType" :tick-labels="chartTypeLabels" :max="3" step="1" ticks="always" tick-size="4" />
                        </div>
                        <v-card width="100%">
                            <bar-chart v-if="chartType === 0" :chartdata="chartData" :options="options" />
                            <line-chart v-if="chartType === 1" :chartdata="chartData" :options="options" />
                            <pie-chart v-if="chartType === 2" :chartdata="pieData" :options="options" />
                            <radar-chart v-if="chartType === 3" :chartdata="chartData" :options="options" />
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <edit-dialog :type="chartTypeLabels[chartType]" />
            <error-dialog />
        </v-main>
        <v-footer class="justify-center" light app>
            <span>made with <v-icon color="pink lighten-1">mdi-heart</v-icon> for the Widget Lab</span>
        </v-footer>
    </v-app>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html,
body {
    overflow-y: auto !important;
    overflow-x: hidden !important;
}
</style>

<style scope>
.my-toolbar {
    display: flex;
}

.my-toolbar >>> .v-btn {
    padding-bottom: 15px !important;
}
</style>

<script>
import { mapState, mapMutations } from "vuex";

import BarChart from "../plugins/chartJS/BarChartJs";
import LineChart from "../plugins/chartJS/LineChartJs";
import PieChart from "../plugins/chartJS/PieChartJs";
import RadarChart from "../plugins/chartJS/RadarChartJs";
import EditDialog from "./dialogs/edit-chart.vue";
import ErrorDialog from "./dialogs/error-dialog.vue";

// widget object is available everywhere !
console.debug(widget);

export default {
    name: "App",
    components: {
        BarChart,
        LineChart,
        PieChart,
        RadarChart,
        EditDialog,
        ErrorDialog
    },
    data() {
        return {
            message: "Select the type of your ChartJS",
            chartType: 0,
            chartTypeLabels: ["Bar", "Line", "Pie", "Radar"]
        };
    },
    computed: {
        ...mapState("chart", ["chartData", "pieData", "options"])
    },
    watch: {
        chartType(newValue) {
            this.updateTitle(this.chartTypeLabels[newValue]);
        }
    },
    methods: {
        ...mapMutations("chart", ["updateTitle", "showDialog"])
    }
};
</script>
