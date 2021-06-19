<template>
  <v-content>
    <v-app>
      <v-app-bar fixed dense dark color="indigo">
        <v-toolbar-title>金庫計算機</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >データーをリセットしますか？</v-card-title
            >
            <v-card-text>リセットした内容は復元できません。</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false"
                >いいえ</v-btn
              >
              <v-btn color="green darken-1" text @click="resetAll()"
                >はい</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" max-width="290">
          <v-card>
            <v-card-title class="headline">金額を入力してください</v-card-title>
            <v-card-text>
              <v-text-field v-model="kinkoTmp" type="number"> </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog2 = false"
                >キャンセル</v-btn
              >
              <v-btn color="green darken-1" text @click="changeKinko()"
                >変更</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn @click="dialog = true" color="red darken-4">リセット</v-btn>
        <v-btn @click="dialog2 = true" color="primary darken-4" class="ml-4"
          >金庫額</v-btn
        >
      </v-app-bar>
      <v-content>
        <div style="height: 38px"></div>
        <v-container fluid>
          <defform
            v-for="(item, index) in kinds"
            :item="item"
            :key="index"
            :index="index"
          ></defform>
          <additionalform
            class
            v-for="(item, index) in this.getAdditionalValue"
            :key="'a' + item[2]"
            :index="index"
          ></additionalform>
          <div class="mb-4"></div>
          <v-btn @click="addNewAdditinalForm()" block color="primary"
            >新しい計算を追加</v-btn
          >
          <div class="mb-4"></div>
          <p
            style="text-align: right"
            class="font-weight-bold text-lg-right subtitle-1"
          >
            合計:{{ total }}
            <br />
            差額:{{ sign }}{{ total - kinkoGaku }}
          </p>
        </v-container>
      </v-content>
    </v-app>
  </v-content>
</template>
<script>
import defform from "./components/DefForm.vue";
import additionalform from "./components/additional-form.vue";

export default {
  name: "App",

  components: {
    defform,
    additionalform,
  },
  methods: {
    addNewAdditinalForm: function () {
      if (this.isFirst == true) {
        this.tempIndex = this.getAdditionalValue.length;
        this.isFirst = false;
      }
      this.$store.commit(`addNewAdditinalForm`, this.tempIndex);
      this.tempIndex++;
    },
    resetAll: function () {
      this.dialog = false;
      this.$store.commit(`allReset`);
    },
    changeKinko: function () {
      this.dialog2 = false;
      this.$store.commit(`kinkoTmp`, this.kinkoTmp);
    },
  },
  data: function () {
    return {
      kinkoTmp: 0,
      dialog: false,
      dialog2: false,
      tempIndex: 0,
      irk: false,
      isFirst: true,
      kinds: [
        { name: "500円", enName: "500yen" },
        { name: "100円", enName: "100yen" },
        { name: "50円", enName: "50yen" },
        { name: "10円", enName: "10yen" },
        { name: "5円", enName: "5yen" },
        { name: "1円", enName: "1yen" },
        { name: "10000円", enName: "10000yen" },
        { name: "5000円", enName: "5000yen" },
        { name: "1000円", enName: "1000yen" },
      ],
    };
  },
  computed: {
    sign: function () {
      if (this.total < this.kinkoGaku) {
        return "";
      } else if (this.total > this.kinkoGaku) {
        return "+";
      } else if (this.total == this.kinkoGaku) {
        return "±";
      }
      return "エラー";
    },
    total: function () {
      return this.$store.getters.total;
    },
    getAdditionalValue: function () {
      return this.$store.getters.getAdditionalValue;
    },
    kinkoGaku: function () {
      return this.$store.getters.kinkoGaku;
    },
  },
  created: function () {
    this.$store.commit(`resetKeys`);
  },
  mounted: function () {
    this.kinkoTmp = this.kinkoGaku;
  },
};
</script>
<style>
body {
  touch-action: manipulation;
}
</style>