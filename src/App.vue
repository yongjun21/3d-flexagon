<template>
  <dynamic-viewer id="app"></dynamic-viewer>
</template>

<script>
import DynamicViewer from './components/DynamicViewer.vue'

export default {
  name: 'App',
  components: {
    DynamicViewer
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
