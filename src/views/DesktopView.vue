<script setup>
import { ref, watch, nextTick, onMounted } from "vue";

import videojs from "video.js";

import "video.js/dist/video-js.min.css";

import TimeLine from "@/components/TimeLine.vue";

import RetroButton from "@/components/RetroButton.vue";

// ✅ media

import video from "@/assets/video.mp4";
import poster from "@/assets/poster.jpg";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";
import image8 from "@/assets/image8.jpg";
import image9 from "@/assets/image9.jpg";

// ✅ load media

const readyCount = ref(0);

const setReadyCount = (val) => {
  readyCount.value = val;
};

[
  poster,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
].forEach((src) => {
  const image = new Image();
  image.src = src;
  image.onload = () => setReadyCount(++readyCount.value);
});

watch(readyCount, (newVal) => {
  if (newVal === 11) setStep("start");
});

// ✅ shared data

const data = ref([
  {
    key: 0,
    src: image1,
  },
  {
    key: 1,
    src: image2,
  },
  {
    key: 2,
    src: image3,
  },
  {
    key: 3,
    src: image4,
  },
  {
    key: 4,
    src: image5,
  },
  {
    key: 5,
    src: image6,
  },
  {
    key: 6,
    src: image7,
  },
  {
    key: 7,
    src: image8,
  },
  {
    key: 8,
    src: image9,
  },
]);

const step = ref("not-ready");

const isPass = ref(false);

const holdIndex = ref(null);

const showPlayButton = ref(false);

const setStep = async (val) => {
  step.value = val;

  if (step.value === "in-progress") {
    await nextTick();
    // TODO 這邊到時候要判斷是 mobile 再初始化
    makeHoldImageSize();
    makeImagesPosition();
    // document.addEventListener("touchmove", onImageContainerTouchMove);
    imageContainer.value.addEventListener(
      "touchmove",
      onImageContainerTouchMove
    );
    startInterval();
  }
};

const setIsPass = (val) => {
  isPass.value = val;
};

const setHoldIndex = (val) => {
  holdIndex.value = val;
};

const setShowPlayButton = (val) => {
  showPlayButton.value = val;
};

// ✅ timer

let secondTimer = null;

let millisecondTimer = null;

const second = ref(0);

const millisecond = ref(0);

const setSecond = (val) => {
  second.value = val;
};

const setMillisecond = (val) => {
  millisecond.value = val;
};

const startInterval = () => {
  secondTimer = setInterval(() => {
    setSecond(++second.value);
  }, 1000);

  millisecondTimer = setInterval(() => {
    if (millisecond.value >= 99) {
      setMillisecond(0);
    } else {
      setMillisecond(++millisecond.value);
    }
  }, 10);
};

const closeInterval = () => {
  clearInterval(secondTimer);
  clearInterval(millisecondTimer);
};

// ✅ video

let videoPlayer = null;

const options = {
  sources: [
    {
      src: video,
      type: "video/mp4",
    },
  ],
  poster,
  preload: "auto",
  controls: false,
  playsinline: true,
  bigPlayButton: false,
};

const videoRef = ref(null);

const videoClass = ref("");

const setVideoClass = (val) => {
  videoClass.value = val;
};

const onVideoReady = () => {
  videoPlayer.on("canplay", () => ++readyCount.value);
};

const playVideo = () => {
  setShowPlayButton(false);
  videoPlayer.play();
};

// ✅ mobile data

const imageContainer = ref(null);

const holdData = ref(null);

const imagesPosition = ref([]);

const diff = ref({
  x: 0,
  y: 0,
});

const holdPosition = ref({
  top: 0,
  left: 0,
});

const holdImageSize = ref({
  width: 0,
  height: 0,
});

const setHoldData = (val) => {
  holdData.value = val;
};

const setImagePosition = (val) => {
  imagesPosition.value = val;
};

const setDiff = (key, val) => {
  diff.value[key] = val;
};

const setHoldPosition = (key, val) => {
  holdPosition.value[key] = val;
};

const setHoldImageSize = (key, val) => {
  holdImageSize.value[key] = val;
};

const makeHoldImageSize = () => {
  const target = document.querySelector('[data-key="0"]');

  setHoldImageSize("width", target.clientWidth);
  setHoldImageSize("height", target.clientHeight);
};

const makeImagesPosition = () => {
  const mapRes = data.value.map((item) => {
    const target = document.querySelector(`[data-key="${item.key}"]`);
    const bound = target.getBoundingClientRect();
    return {
      key: item.key,
      top: bound.top,
      bottom: bound.bottom,
      left: bound.left,
      right: bound.right,
    };
  });

  setImagePosition(mapRes);
};

const onImageContainerTouchMove = (e) => {
  if (holdIndex.value === null) return;

  const [x, y] = [e.touches[0].clientX, e.touches[0].clientY];

  imagesPosition.value.forEach((item) => {
    if (
      y >= item.top &&
      y <= item.bottom &&
      x >= item.left &&
      x <= item.right
    ) {
      const enterIndex = item.key;

      [data.value[holdIndex.value], data.value[enterIndex]] = [
        data.value[enterIndex],
        data.value[holdIndex.value],
      ];

      setHoldIndex(enterIndex);
    }
  });
};

const onTouchStart = (index) => {
  const [target, touch] = [window.event.target, window.event.touches[0]];

  setHoldIndex(index);

  const key = +target.dataset.key;
  setHoldData(data.value[key]);

  const tocuhY = touch.clientY;
  const boundY = target.getBoundingClientRect().y;
  const diffY = tocuhY - boundY;
  const top = tocuhY - diffY;
  setHoldPosition("top", top);
  setDiff("y", diffY);

  const touchX = touch.clientX;
  const boundX = target.getBoundingClientRect().x;
  const diffX = touchX - boundX;
  const left = touchX - diffX;
  setHoldPosition("left", left);
  setDiff("x", diffX);
};

const onTouchMove = (e) => {
  const touch = e.touches[0];

  const touchY = touch.clientY;
  const top = touchY - diff.value.y;
  setHoldPosition("top", top);

  const touchX = touch.clientX;
  const left = touchX - diff.value.x;
  setHoldPosition("left", left);
};

const onTouchEnd = () => {
  setHoldData(null);
  setHoldIndex(null);
  setHoldPosition("top", 0);
  setHoldPosition("left", 0);
  setDiff("y", 0);
  setDiff("x", 0);
  checkPass();
};

// ✅ desktop data

const onDragStart = (index) => {
  setHoldIndex(index);
};

const onDragEnter = (e) => {
  const enterIndex = +e.target.dataset.key;

  [data.value[holdIndex.value], data.value[enterIndex]] = [
    data.value[enterIndex],
    data.value[holdIndex.value],
  ];

  setHoldIndex(enterIndex);
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onDrop = () => {
  checkPass();
};

const onDragEnd = () => {
  setHoldIndex(null);
};

// ✅ helpers

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const num = Math.floor(Math.random() * (index + 1));
    [array[index], array[num]] = [array[num], array[index]];
  }

  if (!isIncreasingSequence()) return;
  shuffle(data.value);
};

const isIncreasingSequence = () => {
  return data.value.map((item) => item.key).join("") === "012345678";
};

const checkPass = async () => {
  if (!isIncreasingSequence()) return;
  closeInterval();
  setIsPass(true);
  setVideoClass("shake-opacity shake-constant");
  setTimeout(() => {
    setVideoClass("");
    setShowPlayButton(true);
  }, 1000);
};

// ✅ onMounted

onMounted(() => {
  videoPlayer = videojs(videoRef.value, options, onVideoReady);
  shuffle(data.value);
});
</script>

<template>
  <!-- ✅ shared -->

  <div v-show="step === 'not-ready'" class="not-ready">
    <p>Loading ...</p>
  </div>

  <div v-show="step === 'start'" class="start-view">
    <RetroButton
      type="start"
      text="Play Game"
      @click="setStep('in-progress')"
    />
  </div>

  <div v-show="step === 'in-progress'" class="gaming-zone">
    <div v-show="isPass" :class="['video-container', videoClass]">
      <video ref="videoRef" class="video-js"></video>
    </div>

    <div v-show="!isPass" ref="imageContainer" class="image-container">
      <div
        v-for="(item, index) in data"
        :key="index"
        :data-key="index"
        class="image"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @drop="onDrop"
        @dragend="onDragEnd"
        @touchstart="onTouchStart(index)"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        :style="{ backgroundImage: `url(${item.src})` }"
      ></div>
    </div>

    <TimeLine :second="second" :millisecond="millisecond" />

    <RetroButton
      v-show="showPlayButton"
      type="click-me"
      text="Click Me!"
      @click="playVideo"
    />

    <!-- ✅ mobile -->

    <div
      v-show="holdData"
      class="hold-image"
      :style="{
        width: `${holdImageSize.width}px`,
        height: `${holdImageSize.height}px`,
        top: `${holdPosition.top}px`,
        left: `${holdPosition.left}px`,
        backgroundImage: holdData ? `url(${holdData.src})` : '',
      }"
    ></div>
  </div>
</template>

<style scoped>
/* ✅ shared */

.start-view,
.not-ready {
  width: 100%;
  height: 100%;
}

.not-ready p {
  color: white;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gaming-zone {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container,
.image-container {
  width: auto;
  height: 75%;

  display: flex;

  aspect-ratio: 1 / 1.8;
}

/* ✅ video */

.video-container {
  align-items: center;
  justify-content: center;
}

.video-js {
  width: 100%;
  height: 100%;
}

/* ✅ image */

.image-container {
  flex-wrap: wrap;
}

.image {
  width: 33.33%;
  height: 33.33%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  cursor: move;
}

/* ✅ mobile */

.hold-image {
  position: absolute;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
