<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
</style>
