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
    // src: "/src/assets/helen0.jpg",
  },
  {
    key: 1,
    src: image2,
    // src: "/src/assets/helen1.jpg",
  },
  {
    key: 2,
    src: image3,
    // src: "/src/assets/helen2.jpg",
  },
  {
    key: 3,
    src: image4,
    // src: "/src/assets/helen3.jpg",
  },
  {
    key: 4,
    src: image5,
    // src: "/src/assets/helen4.jpg",
  },
]);

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

const setHoldData = (val) => (holdData.value = val);

const setHoldPosition = (key, val) => (holdPosition.value[key] = val);

const setDiff = (key, val) => (diff.value[key] = val);

// const setImagePosition = (e) => {
//   const touch = e.touches[0];

//   const tocuhY = touch.clientY;
//   const boundTop = e.target.getBoundingClientRect().y;
//   const diffY = tocuhY - boundTop;
//   const top = tocuhY - diffY;
//   setHoldPosition("top", top);

//   const touchX = touch.clientX;
//   const boundLeft = e.target.getBoundingClientRect().x;
//   const diffX = touchX - boundLeft;
//   const left = touchX - diffX;
//   setHoldPosition("left", left);

//   setDiff("x", diffX);
//   setDiff("y", diffY);
// };

const onTouchStart = (e) => {
  const key = +e.target.dataset.key;
  setHoldData(data.value[key]);

  const [touch, bound] = [e.touches[0], e.target.getBoundingClientRect()];

  const tocuhY = touch.clientY;
  const boundTop = bound.y;
  const diffY = tocuhY - boundTop;
  const top = tocuhY - diffY;
  setHoldPosition("top", top);
  setDiff("y", diffY);

  const touchX = touch.clientX;
  const boundLeft = bound.x;
  const diffX = touchX - boundLeft;
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
  setHoldPosition("top", 0);
  setHoldPosition("left", 0);
  setDiff("y", 0);
  setDiff("x", 0);
};

onMounted(() => {
  gamingZoneRef.value.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const [x, y] = [touch.clientX, touch.clientY];
    console.log(x, y);
  });

  // console.log(
  //   document.querySelector(`[data-key="${0}"]`).getBoundingClientRect()
  // );

  // console.log(
  //   document.querySelector(`[data-key="${1}"]`).getBoundingClientRect()
  // );
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
      :style="{ backgroundImage: 'url(' + item.src + ')' }"
    ></div>
  </div>

  <div
    v-show="holdData"
    ref="holdRef"
    class="hold-image"
    :style="{
      top: holdPosition.top + 'px',
      left: holdPosition.left + 'px',
      backgroundImage: holdData ? 'url(' + holdData.src + ')' : '',
    }"
  ></div>
</template>

<style scoped>
.information {
  height: 64px;

  margin-bottom: 16px;
  background-color: yellow;
}

.gaming-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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
