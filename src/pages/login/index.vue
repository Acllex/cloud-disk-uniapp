<template>
  <view class="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <view class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </view>

    <view class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="formSubmit">
        <view>
          <text class="block text-sm font-semibold leading-6 text-gray-900">用户名</text>
          <view class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              class="block w-full h-10 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </view>
        </view>

        <view>
          <view class="mt-4 flex items-center justify-between">
            <view class="font-semibold block text-sm leading-6 text-gray-900">密码</view>
            <view class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</a>
            </view>
          </view>
          <view class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full h-10 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </view>
        </view>

        <view class="mt-8">
          <button
            form-type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            登录
          </button>
        </view>
      </form>

      <view class="mt-10 text-center text-sm text-gray-500">
        没有账户?
        {{ " " }}
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">注册</a>
      </view>
    </view>
  </view>
</template>

<script setup>
const formSubmit = (e) => {
  console.log(e.detail.value, 1111);
};
</script>
