<template>
  <view class="content">
    <uni-list>
      <uni-list-item>
        <template v-slot:body>
          <view class="slot-box">
            <text class="slot-text">使用 body 插槽</text>
          </view>
        </template>
      </uni-list-item>
      <uni-list-item title="自定义右侧插槽" note="列表描述信息" link>
        <template v-slot:footer>
          <image class="slot-image" src="/static/logo.png" mode="widthFix"></image>
        </template>
      </uni-list-item>
      <uni-list-item>
        <template v-slot:header>
          <view class="slot-box">
            <image class="slot-image" src="/static/logo.png" mode="widthFix"></image>
          </view>
        </template>
        <template v-slot:body>
          <text class="slot-box slot-text text-3xl font-bold text-slate-100">自定义两侧插槽</text>
        </template>
        <template v-slot:footer>
          <image class="slot-image" src="/static/logo.png" mode="widthFix"></image>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>
<style lang="scss">
.slot-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.slot-image {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  margin-right: 10px;
  width: 30px;
  height: 30px;
}

.slot-text {
  flex: 1;
  font-size: 14px;
  /* color: #4cd964; */
  margin-right: 10px;
}
</style>
