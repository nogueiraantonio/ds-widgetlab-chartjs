<template>
    <v-row justify="center">
        <v-dialog v-model="showdialog" persistent max-width="1000px">
            <v-card>
                <v-card-title>
                    <span class="headline">Settings</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <span class="headline">DataSet</span>
                                <v-jsoneditor v-if="showDialog" v-model="vueJSChartData" :options="opt" :plus="false" :height="getHeight()" @error="onError" />
                            </v-col>
                            <v-col>
                                <span class="headline">Options</span>
                                <v-jsoneditor v-if="showDialog" v-model="options" :options="opt" :plus="false" :height="getHeight()" @error="onError" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="save"> Run </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VJsoneditor from "v-jsoneditor";

import cloneDeep from "lodash/cloneDeep";

const PIE = "Pie";
let dataSave = null;

export default {
    components: {
        VJsoneditor
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            hasError: false,
            opt: {
                mode: "code",
                mainMenuBar: false
            },
            chartData: {
                datasets: [
                    {
                        label: "My first dataset",
                        backgroundColor: "#ff6384",
                        borderColor: "#ff6384",
                        fill: false,
                        data: [12, 20, 1, 50, 10, 40, 18]
                    }
                ],
                labels: ["January", "February", "March", "April", "May", "June", "July"]
            },
            pieData: {
                datasets: [
                    {
                        data: [35, 5, 15, 20, 25],
                        backgroundColor: ["#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0", "#36a2eb"],
                        label: "Dataset 1"
                    }
                ],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "chart.js Chart"
                }
            }
        };
    },
    computed: {
        ...mapState("chart", ["showdialog"]),
        vueJSChartData: {
            get() {
                return this.type === PIE ? this.pieData : this.chartData;
            },
            set(val) {
                this.hasError = false;
                if (this.type === PIE) {
                    this.pieData = val;
                } else {
                    this.chartData = val;
                }
            }
        }
    },
    watch: {
        showdialog(val) {
            if (val) {
                dataSave = cloneDeep({ chartData: this.vueJSChartData, opt: this.options });
            }
        },
        options(val) {
            this.hasError = false;
        }
    },
    methods: {
        ...mapMutations("chart", ["showDialog", "showErrorDialog", "setData", "setOptions"]),
        save() {
            if (this.hasError) {
                this.showErrorDialog(true);
            } else {
                const dataChart = cloneDeep(this.vueJSChartData);
                const opt = cloneDeep(this.options);
                this.setData({ type: this.type, data: dataChart });
                this.setOptions(opt);
                this.showDialog(false);
            }
        },
        cancel() {
            this.vueJSChartData = dataSave.chartData;
            this.options = dataSave.opt;
            this.hasError = false;
            this.showDialog(false);
        },
        onError() {
            this.hasError = true;
        },
        getHeight() {
            return window.innerHeight * 0.6 + "px";
        }
    }
};
</script>
