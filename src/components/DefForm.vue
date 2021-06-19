<template>
  <div>
    <v-row align="center" >
      <div class="cus-col cus-col1">
        <p class="subtitle-1 font-weight-medium ma-0">{{this.item.name}}</p>
      </div>
      <div class="cus-col cus-col2">
        <v-text-field
          hide-details="true"
          dense
          solo
          v-model="numValue"
          :key="this.item.enName"
          :id="this.item.enName"
          type="number"
          @focus="focused"
          @focusout="focusedOut"
        ></v-text-field>
      </div>
      <div class="cus-col cus-col3" >
        <v-btn width="10" color="success" @click="increase()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div class="cus-col cus-col4" >
        <p class="title ma-0">{{numValue*[25000, 5000, 2500, 500, 250, 50, 10000, 5000,1000][this.index]}}</p>
      </div>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "def-form",
  data: function() {
    return {};
  },
  methods: {
    increase: function() {
      this.$store.commit(`increase`, this.index);
    },
     focused: function(){
      if(this.numValue==0){
        this.$store.commit(`valueInputed`, { index: this.index, value: null });
      }
    },focusedOut: function(){
      if(!this.numValue){
        this.$store.commit(`valueInputed`, { index: this.index, value: 0 });
      }
    }
  },
  props: ["item", "index"],
  computed: {
    numValue: {
      get: function() {
        return this.$store.state.value[this.index];
      },
      set: function(v) {
        this.$store.commit(`valueInputed`, { index: this.index, value: v });
      }
    }
  }
};
</script>
<style>
.cus-col.cus-col3>.v-btn:not(.v-btn--round).v-size--default{
  min-width :35px!important;
  padding:0px!important;
}
.cus-col{
  padding: 8px 0px 8px 12px;
}
.cus-col1{
  width: 89px !important;
}
.cus-col2{
  width: calc(100% - 234px);
}
.cus-col4{
  width: 82px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>