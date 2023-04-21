<script setup>
import { ref } from "vue";

import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";
import image8 from "@/assets/image8.jpg";
import image9 from "@/assets/image9.jpg";

// ✅ data

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

const isPass = ref(false);

const videoRef = ref(null);

// ✅ desktop

const holdIndex = ref(null);

const setHoldIndex = (index) => {
  holdIndex.value = index;
};

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
  if (isIncreasingSequence()) {
    isPass.value = true;
    videoRef.value.play();
  }
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

  if (isIncreasingSequence()) {
    shuffle(data.value);
  }
};

const isIncreasingSequence = () => {
  return data.value.map((item) => item.key).join("") === "012345678";
};

shuffle(data.value);
</script>

<template>
  <div class="gaming-zone">
    <div v-show="isPass" class="video-container">
      <video ref="videoRef" class="video" src="@/assets/video.mp4"></video>
    </div>

    <div v-show="!isPass" class="image-container">
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
        :style="{ backgroundImage: `url(${item.src})` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
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

.video-container {
  align-items: center;
  justify-content: center;
}

.video {
  width: 100%;
  height: 100%;
}

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
</style>
