import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const initialState = {
    value: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    additionalvalue: [],
    isNewlyCreated: false,
    kinkoGaku: 300000,
};

export default new Vuex.Store({
    state: initialState,
    mutations: {
        allReset(state) {
            state.value = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            state.additionalvalue = [];
        },
        kinkoTmp(state, kinkoTmp) {
            state.kinkoGaku = kinkoTmp;
        },
        valueInputed(state, { index, value }) {
            Vue.set(state.value, index, value);
        },
        additionalValueInputed(state, { index, value, isFirst }) {
            Vue.set(state.additionalvalue[index], isFirst ? 0 : 1, value);
        },
        increase(state, index) {
            let increasednum = Number(state.value[index]) + 1;
            console.log(increasednum);
            Vue.set(state.value, index, increasednum);
        },
        addNewAdditinalForm(state, totalIndex) {
            state.additionalvalue.push([0, 1, totalIndex]);
            state.isNewlyCreated = true;
        },
        increaseAdditional(state, index) {
            Vue.set(
                state.additionalvalue[index],
                1,
                Number(state.additionalvalue[index][1]) + 1
            );
        },
        deleteAdditional(state, index) {
            state.additionalvalue.splice(index, 1);
        },
        resetKeys(state) {
            for (let i = 0; i < state.additionalvalue.length; i++) {
                Vue.set(state.additionalvalue[i], 2, i);
            }
        },
        notNewly(state) {
            state.isNewlyCreated = false;
        },
    },
    getters: {
        total: (state) => {
            return (
                state.value
                    .map(function(v, i) {
                        return (
                            v *
                            [
                                25000,
                                5000,
                                2500,
                                500,
                                250,
                                50,
                                10000,
                                5000,
                                1000,
                            ][i]
                        );
                    })
                    .reduce(function(a, b) {
                        return Number(a) + Number(b);
                    }) +
                (state.additionalvalue.length === 0
                    ? 0
                    : state.additionalvalue
                          .map(function(v) {
                              return v[0] * v[1];
                          })
                          .reduce(function(a, b) {
                              return Number(a) + Number(b);
                          }))
            );
        },
        getAdditionalValue: (state) => state.additionalvalue,
        kinkoGaku: (state) => state.kinkoGaku,
    },

    plugins: [createPersistedState()],
});
