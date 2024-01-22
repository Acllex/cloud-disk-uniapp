<template>
  <view class="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <view class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录云盘账号</h2>
    </view>

    <view class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <uni-forms ref="forms" :rules="rules" :modelValue="formData" label-position="top">
        <uni-forms-item required label="用户名" name="username">
          <uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />
        </uni-forms-item>
        <uni-forms-item required label="密码" name="password">
          <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
        </uni-forms-item>
        <uni-forms-item class="mb-3" required name="code" label="验证码">
          <view class="flex items-center">
            <view class="w-1/2">
              <uni-easyinput type="text" v-model="formData.code" placeholder="请输入验证码" />
            </view>
            <image class="w-1/2 h-8" :src="codeImg" @click="changeCodeImg" />
          </view>
        </uni-forms-item>
        <button class="mt-8 h-11 flex items-center justify-center" type="primary" @click="submitForm('forms')">登录</button>
      </uni-forms>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { loginApi, verCodeApi } from "@/api/users.js";

const forms = ref();
const formData = ref({
  username: "",
  password: "",
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
        maxLength: 12,
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
        minLength: 6,
        maxLength: 20,
        errorMessage: "密码名长度在 {minLength} 到 {maxLength} 个字符",
      },
    ],
  },
  code: {
    rules: [
      {
        required: true,
        errorMessage: "请输入验证码",
      },
      {
        length: 5,
        errorMessage: "密码名长度是 {length} 个字符",
      },
      {
        validateFunction: (rule, value) => {
          return new Promise(async (resolve, reject) => {
            const res = await verCodeApi({ code: value });
            if (res?.data) {
              resolve();
            } else {
              changeCodeImg();
              reject(new Error("验证码错误!"));
            }
          });
        },
      },
    ],
  },
});
const codeImg = ref("https://api.joon.eu.org/api/vercode");

const changeCodeImg = () => {
  codeImg.value = `${codeImg.value}?${Math.random()}`;
};
const submitForm = async () => {
  await forms.value.validate();
  const { data, success } = await loginApi({
    username: formData.value.username,
    password: formData.value.password,
    code: formData.value.code,
  });
  if (success) {
    uni.setStorage({ key: "access_token", data: `Bearer ${data.access_token}` });
    uni.reLaunch({ url: "/pages/index/index" });
  }
};
</script>
