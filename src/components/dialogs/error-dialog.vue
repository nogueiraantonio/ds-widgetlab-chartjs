<template>
    <v-row justify="center">
        <v-dialog v-model="errorDialog" persistent max-width="1000px">
            <v-card>
                <v-alert dense outlined type="error">
                    <v-row align="center" no-gutters>
                        <v-col class="grow"> You have some errors in your settings, correct them before running the chart </v-col>
                        <v-col class="shrink">
                            <v-btn color="error" text icon @click="showErrorDialog(false)">
                                <v-icon>mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState("chart", ["errorDialog"])
    },
    methods: {
        ...mapMutations("chart", ["showErrorDialog"])
    }
};
</script>
