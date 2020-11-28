<template>
  <div class="flexagon">
    <div class="globe">
      <div :class="'block block-' + i" v-for="i in 6" :key="i">
        <div class="tetra" :style="{transform}">
          <div class="triangle triangle-1"><div></div></div>
          <div class="triangle triangle-2"><div></div></div>
          <div class="triangle triangle-3"><div></div></div>
          <div class="triangle triangle-4"><div></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SIDE = 200
const COS30 = Math.cos(Math.PI / 6)

export default {
  props: ['t'],
  computed: {
    transform () {
      let { t } = this
      const rotateXCP = [0, -60, 0, 60, 0]
      const index = Math.min(Math.floor(t / 0.25), 3)
      t = t / 0.25 - index
      t = easeInOut(t, 3)
      const rotateY = ((1 - t) * rotateXCP[index] + t * rotateXCP[index + 1]) / 180 * Math.PI
      const rotateX = syncRotation(rotateY, index)
      const dx = Math.cos(rotateY) * COS30
      const residual = Math.sin(rotateY) * COS30
      const dy = Math.sin(rotateX) * residual
      const dz = Math.cos(rotateX) * residual
      const y = dx / COS30 / 2 - dy
      const z = -dz / 2
      return `translate3d(0, ${y * SIDE}px, ${z * SIDE}px) rotateX(${rotateX}rad) rotateY(${rotateY}rad)`
    }
  }
}

function syncRotation (angle, index) {
  angle = Math.abs(angle)
  const r = 2 / 3 * COS30
  const innerAngle = angle + 30 / 180 * Math.PI
  const outerAngle = angle - 30 / 180 * Math.PI
  const shortSide = Math.cos(innerAngle) * 2 * r
  const longSide = Math.cos(outerAngle) * 2 * r
  const slope = longSide / (longSide - shortSide)
  const height = Math.sqrt(slope * slope - longSide * longSide)
  const synced = Math.atan(0.5 * longSide / height)
  return (
    index === 0 ? synced
      : index === 1 ? Math.PI - synced
        : index === 2 ? Math.PI + synced
          : 2 * Math.PI - synced
  )
}

function easeInOut (t, k = 2) {
  if (t < 0.5) return Math.pow(t / 0.5, k) * 0.5
  else return 1 - Math.pow((1 - t) / 0.5, k) * 0.5
}
</script>

<style lang="scss">
.flexagon {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  perspective: 1000px;
  overflow: hidden;

  $cos30: 0.8660254038;
  $side: 200px;
  $outline-x: 5px;
  $outline-y: $outline-x;
  $inner-side: $side - $outline-x - 2 * $outline-y;

  .globe,
  .block,
  .tetra {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
  }

  .globe {
    // transform: rotateY(-15deg);
  }

  .triangle {
    position: absolute;
    top: calc(50% - #{$side / 2});
    left: 50%;
    width: $side;
    height: $side;
    border-top: 0.5 * $side solid transparent;
    border-bottom: 0.5 * $side solid transparent;
    box-sizing: border-box;

    & > div {
      position: absolute;
      width: $inner-side;
      height: $inner-side;
      // border-top: 0.5 * $inner-side solid transparent;
      // border-bottom: 0.5 * $inner-side solid transparent;
      box-sizing: border-box;
      background-size: contain;
    }
  }

  .triangle-1,
  .triangle-3 {
    border-left: $side solid black;
    transform-origin: 0 50%;

    & > div {
      // border-left: $inner-side solid currentColor;
      left: -$side + $outline-x;
      top: -$side / 2 + 0.5 * $outline-x + $outline-y;
    }
  }

  .triangle-2,
  .triangle-4 {
    border-right: $side solid black;
    transform-origin: $cos30 * 100% 50%;

    & > div {
      // border-right: $inner-side solid currentColor;
      right: -$side + $outline-x;
      top: -$side / 2 + 0.5 * $outline-x + $outline-y;
    }
  }

  .triangle-1 {
    color: #F56565;
    transform: rotateY(-30deg);
  }

  .triangle-3 {
    color: #38B2AC;
    transform: rotateY(30deg);
  }

  .triangle-2 {
    color: #4299E1;
    transform: rotateX(90deg) rotateY(-30deg) translateX(-(1 - $cos30) * $side);
  }

  .triangle-4 {
    color: #ECC94B;
    transform: rotateX(90deg) rotateY(30deg) translateX(-(1 - $cos30) * $side);
  }

  .block-1 {
    transform: rotateZ(-120deg);
  }

  .block-2 {
    transform: rotateZ(-120deg) scaleX(-1);
  }

  .block-3 {
    transform: rotateZ(0);
  }

  .block-4 {
    transform: rotateZ(0) scaleX(-1);
  }

  .block-5 {
    transform: rotateZ(120deg);
  }

  .block-6 {
    transform: rotateZ(120deg) scaleX(-1);
  }

  @for $triangle from 1 through 4 {
    @for $block from 1 through 6 {
      .block-#{$block} .triangle-#{$triangle} > div {
        background-image: url(../assets/1-#{$triangle}-#{$block}.png);
      }
    }
  }
}
</style>
