<template>
  <div>
    <h2>我是about</h2>

  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    this.$parent.$refs.opencanvas.style.width = '0px';
  },

};
</script>

<style>

</style>
