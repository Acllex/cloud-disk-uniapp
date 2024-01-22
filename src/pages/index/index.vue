<template>
  <uni-nav-bar :border="false" backgroundColor="#1296db">
    <template v-slot:left>
      <view class="w-full flex justify-center">
        <text class="text-lg text-white"> 文件 </text>
      </view>
    </template>
    <view class="flex w-full items-center justify-end">
      <uni-icons type="plusempty" color="#fff" size="26" @click="() => popupRef.open('bottom')" />
    </view>
    <template v-slot:right>
      <view class="w-full flex justify-center">
        <uni-icons type="search" size="26" color="#fff" />
      </view>
    </template>
  </uni-nav-bar>

  <view class="p-3">
    <uni-grid :column="3" :highlight="true" :show-border="false" :square="false" @change="change">
      <uni-grid-item v-for="(item, index) in files" :index="index" :key="index">
        <view class="h-full flex flex-col items-center justify-center" style="background-color: #fff">
          <img class="w-16 h-14" src="../../static/icons/folder.png" />
          <text class="text">{{ item.filename }}</text>
          <view @click.stop="moreSel(index)">
            <uni-icons type="more-filled" size="20" color="#bfbfbf"></uni-icons>
          </view>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
  <uni-popup ref="popupRef" background-color="#fff">
    <view class="h-32 p-3 flex flex-col">
      <view class="mb-3">
        <text
          class="text-base"
          @click="
            () => {
              inputDialog.open();
              popupRef.close();
            }
          "
          >创建文件夹</text
        >
      </view>
      <view class="mb-3">
        <text class="text-base">上传</text>
      </view>
    </view>
  </uni-popup>
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="创建新文件夹"
      placeholder="请输入文件夹名称"
      @confirm="dialogInputConfirm"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script setup>
import { useFilesStore } from "@/stores/files";
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useFilesStore();
const { files, loading } = storeToRefs(store);
const { getFiles } = store;
const popupRef = ref();
const inputDialog = ref();

onPullDownRefresh(() => {
  console.log(11222);

  uni.stopPullDownRefresh();
});

const change = ({ detail }) => {
  console.log(detail);
};
const moreSel = (index) => {
  console.log(index);
};
const dialogInputConfirm = (val) => {
  console.log(val);
};
</script>
