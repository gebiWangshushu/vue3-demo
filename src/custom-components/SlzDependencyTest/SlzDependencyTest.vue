<template>
  <div class="dependency-test">
    <my-region></my-region>
    <p>本地组件</p>

    <input type="button" value="调用本地包" @click="showMyMsg('调用本地包')" />
    <input type="button" value="第三包包生成uuid" @click="uuidGen" />
    <p>本地包</p>

    <a-button type="primary">Primary Button</a-button>
    <br />
    <!-- <DatePicker></DatePicker> -->
    <p>第三方组件</p>
  </div>
</template>
  
<script>
//引用了本地组件
import MyRegion from "../MyRegion.vue";
//引用了npm的pack
import { v4 as uuidv4 } from "uuid";

//引用本地包
import { showMsg } from "../../utils";

//引用了第三方的组件
import AButton from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/css";

// import DatePicker from "ant-design-vue/lib/date-picker"; // 加载 JS
import "ant-design-vue/lib/date-picker/style/css"; // 加载 CSS

export default {
  name: "SlzDependencyTest",
  components: {
    MyRegion,
    AButton,
    // DatePicker,
  },
  data() {
    return {};
  },
  methods: {
    uuidGen() {
      alert(uuidv4());
    },
    showMyMsg(msg)
    {
      showMsg(msg);
    }
  },
};
</script>

<style scoped>
.dependency-test {
  /* border: 1px solid rgb(228, 96, 14) ; */
  border: 1px solid red;
  border-radius: 30px;
  max-width: 350px;
  margin-top: 10px;
  padding: 5px;
}
</style>
