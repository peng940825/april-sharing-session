<script setup>
import { reactive } from "vue";

const showDemo = reactive({
  set: false,
  dvh: false,
});

const onVhClick = () => {
  if (!showDemo.set) {
    showDemo.set = true;
  } else {
    showDemo.dvh = true;
  }
};
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <img
        class="biercty"
        src="@/assets/demo/biercty-100vh.jpg"
        @click="onVhClick"
      />
      <img class="code" src="@/assets/demo/code-100vh.png" />
    </div>

    <div v-show="showDemo.set" class="wrapper">
      <img class="biercty" src="@/assets/demo/biercty-set.jpg" />
      <img class="code" src="@/assets/demo/code-set-1.png" />
      <img class="code" src="@/assets/demo/code-set-2.png" />
    </div>

    <div v-show="showDemo.dvh" class="wrapper">
      <img class="biercty" src="@/assets/demo/biercty-100dvh.jpg" />
      <img class="code" src="@/assets/demo/code-100dvh.png" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 2%;
  background-color: black;
}

.wrapper {
  width: 33.33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
}

.biercty {
  width: 45%;
}

.code {
  width: 60%;
  margin-top: 2%;
}
</style>
