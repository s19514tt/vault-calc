<template>
  <transition name="fade">
    <div>
      <v-row align="center">
        <div class="cus-col cus--col1">
          <v-text-field
            hide-details="true"
            dense
            solo
            v-model="firstNumValue"
            :key="this.index"
            type="number"
            @focus="focused(true)"
            @focusout="focusedOut(true)"
            ref="additionalForm"
          ></v-text-field>
        </div>
        <div class="cus-col cus--col2">
          <v-text-field
            hide-details="true"
            dense
            solo
            v-model="secondNumValue"
            :key="this.index"
            type="number"
            @focus="focused(false)"
            @focusout="focusedOut(false)"
          ></v-text-field>
        </div>
        <div class="cus-col cus--col3">
          <v-btn color="success" @click="increase()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="cus-col cus--col4">
          <p class="title ma-0">{{firstNumValue*secondNumValue}}</p>
        </div>
        <div class="cus-col cus--col5">
          <v-btn color="red darken-4" dark @click="deleteItem()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-row>
      <v-divider></v-divider>
    </div>
  </transition>
</template>

<script>
export default {
  name: "additonal-form",
  data: function() {
    return {};
  },
  methods: {
    increase: function() {
      this.$store.commit(`increaseAdditional`, this.index);
    },
    deleteItem: function() {
      this.$store.commit(`deleteAdditional`, this.index);
    },
    focused: function(isFirst) {
      if ((isFirst ? this.firstNumValue : this.secondNumValue) == 0) {
        this.$store.commit(`additionalValueInputed`, {
          index: this.index,
          value: null,
          isFirst: isFirst
        });
      }
    },
    focusedOut: function(isFirst) {
      if (!(isFirst ? this.firstNumValue : this.secondNumValue)) {
        this.$store.commit(`additionalValueInputed`, {
          index: this.index,
          value: 0,
          isFirst: isFirst
        });
      }
    }
  },
  props: ["item", "index"],
  mounted: function() {
    console.log("555555555555");
    if (this.firstNumValue == 0&&this.$store.state.isNewlyCreated==true) {
      this.$refs.additionalForm.focus();
      this.$store.commit(`notNewly`);
    }
  },
  computed: {
    firstNumValue: {
      get: function() {
        return this.$store.state.additionalvalue[this.index][0];
      },
      set: function(v) {
        this.$store.commit(`additionalValueInputed`, {
          index: this.index,
          value: v,
          isFirst: true
        });
      }
    },
    secondNumValue: {
      get: function() {
        return this.$store.state.additionalvalue[this.index][1];
      },
      set: function(v) {
        this.$store.commit(`additionalValueInputed`, {
          index: this.index,
          value: v,
          isFirst: false
        });
      }
    }
  }
};
</script>
<style>
.cus--col3 > .v-btn:not(.v-btn--round).v-size--default {
  width: 35px !important;
  min-width: 35px !important;
  padding: 0px !important;
}
.cus--col5 > .v-btn:not(.v-btn--round).v-size--default {
  width: 35px !important;
  min-width: 35px !important;
  padding: 0px !important;
}
.cus--col {
  padding: 8px 0px 8px 12px;
}
.cus--col1 {
  width: calc((100% - 176px) * 0.5) !important;
}
.cus--col2 {
  width: calc((100% - 176px) * 0.5) !important;
}
.cus--col4 {
  width: 82px !important;
  padding-left: 6px;
}

.cus--col5 {
  padding-left: 0px;
}
</style>