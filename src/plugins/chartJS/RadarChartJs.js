import { Radar } from "vue-chartjs";

export default {
    extends: Radar,
    props: {
        chartdata: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options);
    },
    watch: {
        chartdata(values) {
            if (this.$data._chart) this.$data._chart.destroy();
            this.renderChart(values, this.options);
        }
    }
};
