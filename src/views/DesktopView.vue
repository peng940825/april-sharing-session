<script setup>
import { ref, onMounted } from "vue";

// ✅ images

import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";
import image8 from "@/assets/image8.jpg";
import image9 from "@/assets/image9.jpg";

// ✅ share data

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

const videoRef = ref(null);

const isPass = ref(false);

const holdIndex = ref(null);

const showPlayButton = ref(false);

const setIsPass = (val) => {
  isPass.value = val;
};

const setHoldIndex = (val) => {
  holdIndex.value = val;
};

const setShowPlayButton = (val) => {
  showPlayButton.value = val;
};

// ✅ mobile data

const holdRef = ref(null);

const gamingZoneRef = ref(null);

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

const onDocumentTouchMove = (e) => {
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

  if (isIncreasingSequence()) {
    setIsPass(true);
    setShowPlayButton(true);
    document.removeEventListener("touchmove", onDocumentTouchMove);
  }
};

onMounted(() => {
  makeHoldImageSize();
  makeImagesPosition();
  document.addEventListener("touchmove", onDocumentTouchMove);
});

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
  if (isIncreasingSequence()) {
    setIsPass(true);
    setShowPlayButton(true);
  }
};

const onDragEnd = () => {
  setHoldIndex(null);
};

// ✅ functions

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
  <div ref="gamingZoneRef" class="gaming-zone">
    <!-- ✅ share dom -->

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
        @touchstart="onTouchStart(index)"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        :style="{ backgroundImage: `url(${item.src})` }"
      ></div>
    </div>

    <button
      v-show="showPlayButton"
      type="button"
      class="play-button"
      @click="videoRef.play"
    >
      點我
    </button>

    <!-- ✅ mobile dom -->

    <div
      v-show="holdData"
      ref="holdRef"
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
/* ✅ share class */

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

.play-button {
  position: absolute;
  top: 32px;
  left: auto;
}

/* ✅ mobile class */

.hold-image {
  position: absolute;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
