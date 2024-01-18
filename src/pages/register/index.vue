<template>
  <view class="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <view class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">注册云盘账号</h2>
    </view>

    <view class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <uni-forms ref="forms" :rules="rules" :modelValue="formData" label-position="top">
        <uni-forms-item required label="用户名" name="username">
          <uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />
        </uni-forms-item>
        <uni-forms-item required label="密码" name="password">
          <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
        </uni-forms-item>
        <uni-forms-item required label="再次输入" name="againPassword">
          <uni-easyinput type="password" v-model="formData.againPassword" placeholder="请再次输入密码" />
        </uni-forms-item>
        <uni-forms-item required name="code" label="验证码">
          <view class="flex items-center">
            <view class="w-1/2">
              <uni-easyinput type="text" v-model="formData.code" placeholder="请输入验证码" />
            </view>
            <image class="w-1/2 h-8" :src="codeImg" />
          </view>
        </uni-forms-item>
        <button class="web-height" type="primary" @click="submitForm('forms')">注册</button>
      </uni-forms>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const forms = ref();
const formData = ref({
  username: "",
  password: "",
  againPassword: "",
  code: "",
});
const rules = ref({
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入用户名",
      },
      {
        minLength: 3,
        maxLength: 5,
        errorMessage: "用户名长度在 {minLength} 到 {maxLength} 个字符",
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码",
      },
      {
        minLength: 3,
        maxLength: 5,
        errorMessage: "密码名长度在 {minLength} 到 {maxLength} 个字符",
      },
    ],
  },
  againPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请再次输入用密码",
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (value !== data.password) {
            callback("两次输入的密码必须相同！");
          }
          return true;
        },
      },
    ],
  },
});
const codeImg = ref("https://nest-cloud-be.vercel.app/api/vercode");
const submitForm = async () => {
  await forms.value.validate();
  console.log(formData.value, 1111);
};
</script>

<style scoped>
/* ifdef H5 */
.web-height {
  padding: 20rpx 0;
}
/* endif */
</style>
