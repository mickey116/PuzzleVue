<template>
  <div>
    <h2>我是Cart</h2>
    <button class="btn btn-info" @click="finish">結帳完成</button>

  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    finish() {
      this.$router.push('/checkoutdone');
    },
  },

};
</script>

<style>

</style>
