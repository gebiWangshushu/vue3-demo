<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div id="app"> 
     <!-- <router-view></router-view> -->
     <signal-r2></signal-r2>
  </div>

</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import SignalR2 from './components/SignalR2.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,SignalR2
  }
}
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
