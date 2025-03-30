<template>
  <div id="app">
    <Toast position="top-right" />
    <router-view></router-view>
  </div>
</template>

<script>
import Toast from 'primevue/toast'
export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-family: 'Noto Sans', sans-serif; */
  font-family: "Roboto Flex", serif;
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
