<script setup>
import routingIntercept from "@/utils/permission.js";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
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
