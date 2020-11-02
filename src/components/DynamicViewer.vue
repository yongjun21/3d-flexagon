<template>
  <st-scrolly class="dynamic-viewer" ref="scrolly">
    <template v-slot:background="{progress}">
      <flexagon :t="progress(true)"></flexagon>
    </template>
  </st-scrolly>
</template>

<script>
import StScrolly from '@st-graphics/scrolly'
import '@st-graphics/scrolly/dist/bundle.css'

import Flexagon from './Flexagon.vue'

export default {
  components: {
    StScrolly,
    Flexagon
  },
  mounted () {
    const $scrolly = this.$refs.scrolly
    window.scrollTo(0, 1)
    this.$watch(() => $scrolly.exposedScope, ({ progress }) => {
      if (progress(true) <= 0) window.scrollTo(0, 2400 - window.innerHeight - 1)
      else if (progress(true) >= 1) window.scrollTo(0, 1)
    }, { immediate: true })
  }
}
</script>

<style lang="scss">
.dynamic-viewer {
  .slide {
    height: 2400px;
  }
}
</style>
