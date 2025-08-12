<template>
  <!-- <div id="app">
    <TestComponent />
  </div> -->
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue'
// import TestComponent from './components/TestComponent.vue'

export default Vue.extend({
  name: 'App',
  // components: {
  //   TestComponent
  // }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
