<template>
  <div id="app">
   <!-- <img src="./assets/logo.png" id="logoImg">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  display: block;
  margin: 0px;
}
#logoImg{
  width:5%;
  height:5%;
}
</style>
