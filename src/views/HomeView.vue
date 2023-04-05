<script setup>
import { ref, onMounted } from "vue";

const fill = ref(null);

const empties = ref(null);

// fill handler
const onDragStart = (e) => {
  console.log("start");
  e.target.className += " hold";
  setTimeout(() => (e.target.className = "invisible"), 0);
};

const onDragEnd = (e) => {
  console.log("end");
  e.target.className = "fill";
};

const onDragOver = (e) => {
  console.log("over");
  e.preventDefault();
};

const onDragEnter = (e) => {
  console.log("enter");
  e.preventDefault();
  e.target.className += " hovered";
};

const onDragLeave = (e) => {
  console.log("leave");
  e.target.className = "empty";
};

const onDrop = (e) => {
  console.log("drop");
  e.target.className = "empty";
  e.target.append(fill.value);
};

onMounted(() => {
  empties.value = document.querySelectorAll(".empty");

  for (const empty of empties.value) {
    empty.addEventListener("dragover", onDragOver);
    empty.addEventListener("dragenter", onDragEnter);
    empty.addEventListener("dragleave", onDragLeave);
    empty.addEventListener("drop", onDrop);
  }
});
</script>

<template>
  <div>
    <div class="empty">
      <div
        ref="fill"
        class="fill"
        draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
      ></div>
    </div>
    <div class="empty"></div>
    <div class="empty"></div>
    <div class="empty"></div>
    <div class="empty"></div>
  </div>
</template>

<style scoped>
body {
  background-color: cadetblue;
}

.fill {
  width: 150px;
  height: 150px;
  position: relative;
  top: 5px;
  left: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("@/assets/img-4.jpg");
  cursor: pointer;
}

.empty {
  width: 160px;
  height: 160px;
  display: inline-block;
  border: 3px salmon solid;
  background-color: white;
  margin: 10px;
}

.hold {
  border: 4px #ccc solid;
}

.hovered {
  background-color: #f4f4f4;
  border-style: dashed;
}

.invisible {
  display: none;
}
</style>
