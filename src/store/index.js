import Vue from "vue";
import Vuex from "vuex";
import chart from "./chart";

Vue.use(Vuex);

// init store
export const store = new Vuex.Store({
    modules: {
        chart
    }
});
