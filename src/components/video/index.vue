<template>
  <view class="content">
    <view class="text-area">
      <!-- #ifdef H5 -->
      <view ref="videoPlayer" class="video-js" @click="onPlay">
        <!-- <view class="live-bar">
          <text class="video-icon">&#xe8a3;</text>
          <text class="video-icon stop-icon">&#xe600;</text>
          <text class="video-icon">&#xeb99;</text>
          <text class="video-icon">&#xeb98;</text>
        </view> -->
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  src: String,
});
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import { ref, onMounted, onUnmounted, watch } from "vue";
const videoPlayer = ref(null);
const player = ref(null);
onMounted(() => {
  if (videoPlayer.value) {
    const videoEl = document.createElement("video");
    videoEl.id = "video";
    videoEl.style = "with: 100%; height: 100%";
    videoEl.controls = true;
    const source = document.createElement("source");
    videoEl.appendChild(source);
    videoPlayer.value.$el.appendChild(videoEl);
    player.value = videojs(videoEl, {
      autoplay: false,
      muted: true,
      controls: false,
      preload: "auto",
      fluid: true,
      //   aspectRatio: "16:9",
      techOrder: ["html5"],
      sources: [
        {
          src: props.src,
          type: "video/mp4",
        },
      ],
    });
  }
});

onUnmounted(() => {
  if (player.value) {
    player.value.dispose();
  }
});
const onPlay = () => {
  console.log(11111);
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont";
  src: url("https://at.alicdn.com/t/c/font_4340020_teyklvoyp3l.woff2?t=1700555228043") format("woff2"),
    url("https://at.alicdn.com/t/c/font_4340020_teyklvoyp3l.woff?t=1700555228043") format("woff"),
    url("https://at.alicdn.com/t/c/font_4340020_teyklvoyp3l.ttf?t=1700555228043") format("truetype");
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text-area {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.video-js {
  position: relative;
  width: 100%;
  height: 100%;
}
.live-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50rpx;
  /* 背景是渐变色 */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(48, 48, 48, 0.5) 50%, rgba(48, 48, 48, 0.6) 60%, rgba(0, 0, 0, 0.9) 100%);
  z-index: 10;
  display: flex;
}
.video-icon {
  font-family: iconfont;
  margin-left: 20rpx;
  font-size: 42rpx;
  color: white;
}
.stop-icon {
  font-size: 36rpx;
  padding: 4rpx;
}
</style>
