<template>
  <div id="goods">
    <h2>我是Goods</h2>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td> {{item.title}} </td>
        <td> {{item.price}}</td>
        <td>
          <router-link :to="`/goodsdetail/${item.id}`">連結</router-link>
        </td>
        <button @click="addToCart(item.id)">加入購物車</button>
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
      cart: {},
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
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        console.log(res);
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.$http.post(url, cart).then((res) => {
        console.log(res);
        this.$bus.$emit('get-cart');
      });
    },
  },
  created() {
    this.getProducts();
  },

};
</script>

<style lang="scss">
// #goods {
//   padding-top: 72px;
// }

</style>
