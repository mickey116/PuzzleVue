<template>
  <div>
    <h2>我是Goods</h2>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td> {{item.title}} </td>
        <td> {{item.price}}</td>
        <td>
          <router-link :to="`/goodsdetail/${item.id}`">連結</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.data;
      });
    },
  },
  created() {
    this.getProducts();
  },

};
</script>

<style>
</style>``
