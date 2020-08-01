<template>
  <div>
    <h2>我是Goodsdetail</h2>
    {{product.title}}
  </div>
</template>

<script>
export default {
  name: 'Goodsdetail',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const { id } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      vm.$http.get(url).then((res) => {
        console.log(res);
        vm.product = res.data.data;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style>
</style>
