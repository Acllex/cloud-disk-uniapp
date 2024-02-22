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
      <uni-grid-item class="mb-5" v-for="(item, index) in current" :index="index" :key="index">
        <view class="h-full flex flex-col items-center justify-center">
          <img class="w-16 h-14" :src="typeToIcon(item.type, item.ipfs)" @click="previewImage(item.type, item.ipfs)" />
          <view class="w-10/12 text-center text truncate">{{ item.filename }}</view>
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
  <!-- 单文件操作 -->
  <uni-popup ref="filePopupRef" background-color="#fff">
    <view class="h-32 p-3 flex flex-col">
      <view class="mb-3">
        <text class="text-base">重命名</text>
      </view>
      <view class="mb-3">
        <text
          class="text-base"
          @click="
            () => {
              delFiles(selFile._id, selFile.ipfs);
              filePopupRef.close();
            }
          "
          >删除</text
        >
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { useFilesStore } from "@/stores/files.js";
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useFilesStore();
const { parentStack, current } = storeToRefs(store);
const { getFiles, addFolder, addFile, delFiles } = store;
const popupRef = ref();
const inputDialog = ref();
const filePopupRef = ref();
const selFile = ref();
onLoad(() => {
  getFiles({ name: "根目录", val: { parentId: "root" } });
});

onPullDownRefresh(() => {
  getFiles({}).then(() => uni.stopPullDownRefresh());
});

const change = ({ detail }) => {
  const { filename, _id, type, ipfs } = current.value[detail.index];
  switch (type) {
    case "folder":
      getFiles({ name: filename, val: { parentId: _id } });
      break;
    case "application/x-zip-compressed":
      // window.location.href = ipfs;
      break;
    default:
      break;
  }
};
const onReturn = () => {
  getFiles({ val: { parentId: parentStack.value[parentStack.value.length - 2].id } });
};
const moreSel = (index) => {
  selFile.value = current.value[index];
  filePopupRef.value.open("bottom");
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
  popupRef.value.close();
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
};

const typeToIcon = (type, ipfs) => {
  const filesArr = ["folder", "zip", "pdf"];
  const imgArr = ["image"];
  const file = filesArr.find((item) => type.indexOf(item) !== -1);
  const img = imgArr.find((item) => type.indexOf(item) !== -1);

  if (file) {
    return `../../static/icons/${file}.png`;
  } else if (img) {
    return ipfs;
  }
};

const previewImage = (type, ipfs) => {
  if (type.indexOf("image") !== -1) {
    uni.previewImage({ urls: [ipfs] });
  }
};
</script>
