<script setup>
import { ref, onMounted } from "vue";

import image1 from "@/assets/helen0.jpg";
import image2 from "@/assets/helen1.jpg";
import image3 from "@/assets/helen2.jpg";
import image4 from "@/assets/helen3.jpg";
import image5 from "@/assets/helen4.jpg";

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
]);

// ✅ data

const holdRef = ref(null);

const gamingZoneRef = ref(null);

const holdData = ref(null);

const holdPosition = ref({
  top: 0,
  left: 0,
});

const diff = ref({
  x: 0,
  y: 0,
});

const imagesPosition = ref([]);

// ✅ action

const setHoldData = (val) => (holdData.value = val);

const setHoldPosition = (key, val) => (holdPosition.value[key] = val);

const setDiff = (key, val) => (diff.value[key] = val);

const setImagePosition = (val) => (imagesPosition.value = val);

// ✅ touch events

const onTouchStart = (e) => {
  const [touch, target] = [e.touches[0], e.target];

  target.className += " hold";

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

const onTouchEnd = (e) => {
  e.target.className = "image";

  setHoldData(null);
  setHoldPosition("top", 0);
  setHoldPosition("left", 0);
  setDiff("y", 0);
  setDiff("x", 0);
};

// ✅ helper

const makeImagesPositionData = () => {
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
  const touch = e.touches[0];
  const [x, y] = [touch.clientX, touch.clientY];

  imagesPosition.value.forEach((item) => {
    if (
      y >= item.top &&
      y <= item.bottom &&
      x >= item.left &&
      x <= item.right
    ) {
      const holdDom = document.querySelector(".hold");
      const holdIdx = +holdDom.dataset.key;

      const enterIdx = item.key;
      const enterDom = document.querySelector(`[data-key="${enterIdx}"]`);

      [data.value[holdIdx], data.value[enterIdx]] = [
        data.value[enterIdx],
        data.value[holdIdx],
      ];

      [[holdDom.dataset.key], [enterDom.dataset.key]] = [
        [enterDom.dataset.key],
        [holdDom.dataset.key],
      ];
    }
  });
};

// ✅ onMounted

onMounted(() => {
  makeImagesPositionData();
  document.addEventListener("touchmove", onDocumentTouchMove);
});
</script>

<template>
  <div class="information"></div>

  <div ref="gamingZoneRef" class="gaming-zone">
    <div
      v-for="item in data"
      :key="item.key"
      class="image"
      draggable="true"
      :data-key="item.key"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="{ backgroundImage: `url(${item.src})` }"
    ></div>
  </div>

  <div
    v-show="holdData"
    ref="holdRef"
    class="hold-image"
    :style="{
      top: `${holdPosition.top}px`,
      left: `${holdPosition.left}px`,
      backgroundImage: holdData ? `url(${holdData.src})` : '',
    }"
  ></div>
</template>

<style scoped>
.information {
  height: 15%;

  background-color: yellow;
}

.gaming-zone {
  height: 85%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: blue;
}

.image {
  width: 100px;
  height: 100px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  cursor: move;
  border-radius: 8px;
  margin-bottom: 16px;
}

.image:last-of-type {
  margin-bottom: 0;
}

.hold-image {
  width: 100px;
  height: 100px;

  position: absolute;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 8px;
}
</style>
