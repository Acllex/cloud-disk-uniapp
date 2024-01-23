<template>
  <uni-nav-bar :border="false" backgroundColor="#1296db">
    <template v-slot:left>
      <view class="w-full flex justify-center">
        <uni-icons v-show="parentStack.length > 1" type="arrow-left" size="28" color="#fff" @click="onReturn()" />
      </view>
    </template>
    <view class="flex w-full items-center justify-between">
      <view></view>
      <text class="text-lg text-white"> {{ (parentStack.length > 0 && parentStack[parentStack.length - 1].name) || "" }} </text>
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
      <uni-grid-item v-for="(item, index) in current" :index="index" :key="index">
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
        <uni-file-picker @select="selectFiles" :auto-upload="false" :list-styles="{ overflow: hidden }" file-mediatype="all">
          <text class="text-base">上传</text>
        </uni-file-picker>
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
const { parentStack, current } = storeToRefs(store);
const { getFiles, addFolder, addFile } = store;
const popupRef = ref();
const inputDialog = ref();

onLoad(() => {
  getFiles({ name: "根目录", val: { parentId: "root" } });
});

onPullDownRefresh(() => {
  getFiles({}).then(() => uni.stopPullDownRefresh());
});

const change = ({ detail }) => {
  const { filename, _id } = current.value[detail.index];
  getFiles({ name: filename, val: { parentId: _id } });
};
const onReturn = () => {
  getFiles({ val: { parentId: parentStack.value[parentStack.value.length - 2].id } });
};
const moreSel = (index) => {
  console.log(index);
};
const dialogInputConfirm = (val) => {
  addFolder({
    filename: val,
    parent: parentStack.value[parentStack.value.length - 1].id,
    type: "folder",
    createdAt: new Date(),
  });
};
const selectFiles = async (val) => {
  for (let index = 0; index < val.tempFiles.length; index++) {
    const element = val.tempFiles[index];
    await addFile({
      filename: element.name,
      type: element.file.type,
      file: element.file,
      parent: parentStack.value[parentStack.value.length - 1].id,
      createdAt: new Date(),
    });
  }
  console.log(val.tempFiles);
};
</script>
