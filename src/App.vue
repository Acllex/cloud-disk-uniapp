<script setup>
import routingIntercept from "@/utils/permission.js";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getFilesApi } from "@/api/files.js";
import { useFilesStore } from "@/stores/files";
import { storeToRefs } from "pinia";
const store = useFilesStore();

const { files } = storeToRefs(store);

onLaunch(async () => {
  const token = uni.getStorageSync("access_token");
  const { statusCode, data } = await getFilesApi();
  if (token && statusCode !== 401) {
    files.value = data;
    uni.switchTab({ url: "/pages/index/index" });
  } else {
    uni.removeStorageSync("access_token");
    uni.reLaunch({
      url: "/pages/login/index",
    });
  }
  routingIntercept();
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style>
/*每个页面公共css */
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
