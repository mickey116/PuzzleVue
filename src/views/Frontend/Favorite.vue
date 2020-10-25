<template>
  <div id="favorite" class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <AlertMessage></AlertMessage>
    <!-- banner -->
    <div class="favbannerbox">
      <div class="favbanner mb-4  mt-3 mt-lg-0"
      :style="{backgroundImage: `url(${img.banner})` }">
      </div>
      <h2 class="mb-0">我的收藏</h2>
    </div>
    <!-- main -->
    <div class="favoritedetail mb-3">
      <h5 class="text-center py-3 bg-primary text-white rounded">
        收藏列表（ {{ followProduct.length }} ）</h5>
      <div class="text-center mt-5" v-if="followProduct.length == 0">
        <i class="fas fa-shopping-cart text-secondary fa-5x mb-5"></i>
        <p class="h3 mb-5">您尚未收藏任何商品唷！</p>
        <p class="h5 text-secondary">“再忙，也別忘了犒賞自己唷！“ <i class="far fa-smile-wink"></i></p>
        <div class="mt-5">
          <button class="btn btn-primary btn-lg" @click="goToGoods">
            去商場逛逛
            <i class="fas fa-store-alt"></i>
          </button>
        </div>
      </div>
      <table class="table text-center" v-else>
        <tbody>
          <tr v-for="item in followProduct" :key="item.id">
            <td class="align-middle">
              <a href="#" class="text-secondary trash"
              @click.prevent="delFollow(item.id)">
                <i class="far fa-trash-alt " aria-hidden="true"></i>
              </a>
            </td>
            <td width="100" class="image align-middle">
              <img
                :src="item.imageUrl[0]"
                :alt="item.title"
                width="100%"
              />
            </td>
            <td class="align-middle">
              {{ item.title }}
            </td>
            <td class="align-middle text-right" width="80">{{ item.price | currency }}</td>
            <td class="align-middle">
              <div>
                <a href="#" @click="addToCart(item.id)" class="text-secondary addfavcart">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="text-right">
              <a href="#" @click.prevent="clearAll" class="text-secondary">
                <i class="far fa-trash-alt" aria-hidden="true"></i>
                取消全部收藏
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="mt-5 text-center" v-if="followProduct.length">
        <button class="btn btn-primary btn-lg" @click="goToGoods" type="button">
          繼續購物
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Favorite',
  components: {
    AlertMessage,
  },
  data() {
    return {
      products: {},
      followProduct: {},
      isLoading: false,
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/AIDb0jNmPStBMVophatDs0flxHppWV0yEArvZidhoLmlV0dNxLJEB9ywkq8XVKL8ZRvvEAPaXXucVgO1mcrXmPw2b7QTacURwimLQZT0ADrGJHHjzB8k7vjuwfP78lzf.jpeg',
      },
      followData: JSON.parse(localStorage.getItem('followCard')) || [],
      carts: {},
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.products = res.data.data;
        vm.getFollow();
        vm.isLoading = false;
      });
    },
    getFollow() {
      this.followProduct = this.products.filter((item) => this.followData.indexOf(item.id) > -1);
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.isLoading = true;
      vm.$http.post(url, cart).then(() => {
        vm.isLoading = false;
        vm.$bus.$emit('message:push',
          '加入購物車成功', 'success');
        vm.$bus.$emit('getcart');
      }).catch((error) => {
        vm.isLoading = false;
        const errorData = error.response.data.errors[0];
        vm.$bus.$emit('message:push',
          `${errorData}`, 'danger');
      });
    },
    delFollow(id) {
      const vm = this;
      const followId = this.followData.indexOf(id);
      if (followId !== -1) {
        vm.followData.splice(followId, 1);
        vm.$bus.$emit('message:push',
          '取消收藏', 'danger');
      }
      localStorage.setItem('followCard', JSON.stringify(vm.followData));
      vm.getProducts();
    },
    clearAll() {
      const vm = this;
      vm.followData.splice(0, vm.followProduct.length);
      localStorage.setItem('followCard', JSON.stringify(vm.followData));
      vm.$bus.$emit('message:push',
        '取消全部收藏', 'danger');
      vm.getProducts();
    },
    goToGoods() {
      this.$router.push('/goods');
    },
  },
  created() {
    this.getProducts();
  },

};
</script>
