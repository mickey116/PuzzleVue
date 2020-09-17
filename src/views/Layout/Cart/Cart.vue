<template>
  <div id="cart" class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- 用戶完成進度條 -->
    <Progressbar />
    <!-- main -->
    <div class="cartdetail mb-3">
      <h5 class="text-center py-3 bg-quietpink rounded">購物車</h5>
      <table class="table text-center">
        <tbody>
          <tr v-for="item in cart" :key="item.product.id + 1">
          <td class="align-middle text-center">
            <a href="#" class="text-secondary trash"
            @click.prevent="removeCartItem(item.product.id)">
              <i class="far fa-trash-alt " aria-hidden="true"></i>
            </a>
          </td>
            <td width="100">
              <img
                :src="item.product.imageUrl"
                alt
                width="100%"
              />
            </td>
            <td class="align-middle">{{item.product.title}}</td>
            <td class="align-middle" width="100">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-quietpink"
                  :disabled="item.quantity == 1"
                  @click="item.quantity --;
                  updateQuantity(item.product.id , item.quantity)">-</button>
                </div>
                <input type="number" min="1" class="form-control text-center"
                v-model="item.quantity"
                @change="updateQuantity(item.product.id , item.quantity)">
                <div class="input-group-append">
                  <button type="button"
                  class="btn btn-quietpink"
                  @click="item.quantity ++;
                  updateQuantity(item.product.id , item.quantity)"
                  :disabled="loadingCart === item.product.id">+</button>
                </div>
              </div>
            </td>
            <td class="align-middle text-right" width="50">${{item.product.price}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="coupon">
            <td colspan="3" class="align-middle text-right">
              <i class="fas fa-ticket-alt"></i>
              套用優惠券
            </td>
            <td  class="align-middle">
              <input type="text" v-model="coupon_code">
            </td>
            <td class="align-middle">
              <a href="#" @click.prevent="addCoupon">
                <i class="far fa-paper-plane"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">運費</td>
            <td class="text-right">
              <strong>${{shippingFee}}</strong>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">合計</td>
            <td class="text-right">
              <strong>${{cartTotal + shippingFee}}</strong>
            </td>
          </tr>
          <tr v-if="coupon.enabled">
            <td colspan="4" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">
              <strong>${{ cartTotal * (coupon.percent / 100) }}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="form-row">
        <div class="col">
          <button class="btn btn-outline-secondary btn-block" @click="goToGoods">
            <i class="fas fa-arrow-left mr-2"></i>
            繼續購物
          </button>
        </div>
        <div class="col">
          <button class="btn btn-primary btn-block" @click="goToCheck">
            繼續付款
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progressbar from '@/components/StepProgress.vue';

export default {
  name: 'Cart',
  components: {
    Progressbar,
  },
  data() {
    return {
      products: [],
      cart: {},
      cartTotal: 0,
      shippingFee: 0,
      isLoading: false,
      loadingCart: '',
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      coupon: {},
      coupon_code: '',
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
        // console.log(res);
        vm.cart = res.data.data;
        vm.cartTotal = 0;
        vm.updateTotal();
        vm.isLoading = false;
      });
    },
    updateTotal() {
      // 累加總金額
      const vm = this;
      vm.cart.forEach((item) => {
        vm.cartTotal += (item.product.price * item.quantity);
      });
      // 運費計算
      if (vm.cart.length) {
        if (vm.cartTotal <= 1000) {
          vm.shippingFee = 60;
        }
      } else {
        vm.shippingFee = 0;
      }
    },
    updateQuantity(id, quantity) {
      const vm = this;
      vm.loadingCart = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.$http.patch(url, cart).then((res) => {
        console.log(res);
        vm.loadingCart = '';
        vm.getCart();
        // this.$bus.$emit('get-cart');
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      vm.isLoading = true;
      vm.$http.delete(api).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      vm.isLoading = true;
      vm.$http.post(api, { code: this.coupon_code }).then((res) => {
        console.log(res);
        vm.coupon = res.data.data;
        vm.isLoading = false;
      }).catch((err) => {
        vm.isLoading = false;
        console.log(err);
      });
    },
    goToCheck() {
      this.$router.push('/checkout');
      this.$bus.$emit('pushcode', this.coupon_code);
    },
    goToGoods() {
      this.$router.push('/goods');
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss">
.cartdetail {
  max-width: 600px;
  margin: 0 auto;
}
// navbar
.custom-navbar {
  padding-top: 35.5px;
  .navbar-brand {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    }
  #navbarNav {
    display: none !important;
  }
  .user {
    display: none !important;
  }
}
@media (max-width: 991px) {
  .custom-navbar {
    .navbar-toggler {
      display: none;
    }
  }

}

// table
table {
  .trash {
    &:hover {
      color:red !important;
    }
  }
}
.table td {
  border: none;
  margin: 0.5rem;
}

// coupon
.coupon input {
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
}
</style>
