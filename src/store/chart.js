export default {
    namespaced: true,
    state: {
        showdialog: false,
        errorDialog: false,
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
                text: "chart.js Bar Chart"
            }
        }
    },
    mutations: {
        updateTitle(state, type) {
            state.options.title.text = `chart.js ${type} Chart`;
        },
        setData(state, { data, type }) {
            type === "Pie" ? (state.pieData = data) : (state.chartData = data);
        },
        setOptions(state, options) {
            state.options = options;
        },
        showDialog(state, edit) {
            state.showdialog = edit;
        },
        showErrorDialog(state, errorDialog) {
            state.errorDialog = errorDialog;
        }
    }
};
