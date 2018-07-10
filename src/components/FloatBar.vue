<template lang="html">
  <div id="floatBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #floatBar{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 100%;
    z-index: 10;
  }
</style>
