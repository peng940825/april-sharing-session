<script setup>
import { ref, watch } from "vue";

const imgList = ref([
  {
    key: 0,
    src: "/src/assets/img-0.jpg",
  },
  {
    key: 1,
    src: "/src/assets/img-1.jpg",
  },
  {
    key: 2,
    src: "/src/assets/img-2.jpg",
  },
  {
    key: 3,
    src: "/src/assets/img-3.jpg",
  },
  {
    key: 4,
    src: "/src/assets/img-4.jpg",
  },
]);

const curIdx = ref(null);

const onDragStart = (e) => {
  curIdx.value = Number(e.target.dataset.key);

  setTimeout(() => (e.target.className = "invisible"), 0);
  console.log("start");
};

const onDragEnd = (e) => {
  e.target.className = "fill";

  isSuccess.value = checkSuccess();

  console.log("end");
};

const onDragEnter = (e) => {
  const invisibleDom = document.querySelector(".invisible");
  const invisibleIndex = Number(invisibleDom.dataset.key);

  const enterIndex = Number(e.target.dataset.key);
  const enterDom = document.querySelector(`[data-key="${enterIndex}"]`);

  const temp = imgList.value[invisibleIndex];

  imgList.value[invisibleIndex] = imgList.value[enterIndex];
  imgList.value[enterIndex] = temp;

  const tempIndex = invisibleDom.dataset.key;
  invisibleDom.dataset.key = enterDom.dataset.key;
  enterDom.dataset.key = tempIndex;

  console.log(imgList.value);

  e.preventDefault();
  console.log("enter");
};

const onDragLeave = () => {
  // e.target.className = "wrapper";

  console.log("leave");
};

const onDrop = () => {
  // e.target.className = "wrapper";
  // e.target.append(fill.value);

  console.log("drop");
};

// 檢查排序
const isSuccess = ref(false);

const checkSuccess = () => {
  let res = true;
  imgList.value.reduce((pre, cur) => {
    if (pre.key >= cur.key) res = false;
    return cur;
  });
  return res;
};

watch(isSuccess, (newVal) => {
  console.log(newVal);
});
</script>

<template>
  <div class="container">
    <div v-for="item in imgList" :key="item.key" class="wrapper">
      <img
        class="fill"
        draggable="true"
        :data-key="item.key"
        @dragstart="onDragStart"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragend="onDragEnd"
        @drop="onDrop"
        :src="item.src"
      />
    </div>
  </div>
</template>

<style>
body {
  width: 100vw;
  height: 100vh;
  background-color: black;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
}

.fill {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.wrapper {
  width: 150px;
  height: 150px;
  background-color: white;
  margin-right: 16px;
}

.hold {
  border: 4px #ccc solid;
}

.hovered {
  background-color: #ccc;
}

.invisible {
  display: none;
}
</style>
