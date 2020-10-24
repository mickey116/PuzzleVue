<template>
  <div id="cart" class="container">
    <AlertMessage/>
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- 用戶完成進度條 -->
    <Progressbar />
    <!-- main -->

    <div class="row">
      <div class="col-md-8 mb-4 mx-auto">
        <h5 class="text-center py-3 bg-primary text-white rounded">購物車</h5>
        <div class="text-center mt-5" v-if="cart.length == 0">
          <i class="fas fa-shopping-cart text-secondary fa-5x mb-5"></i>
          <p class="h3 mb-5">購物車還是空的喔！</p>
          <p class="h5 text-secondary">“再忙，也別忘了犒賞自己唷！“ <i class="far fa-smile-wink"></i></p>
          <div class="mt-5">
            <button class="btn btn-primary btn-lg" @click="goToGoods">
              去商場逛逛
            </button>
          </div>
        </div>
        <table class="table text-center cartinfo" v-else>
          <tbody>
            <tr v-for="item in cart" :key="item.product.id + 1">
              <td class="align-middle text-center" width="30">
                <a href="#" class="text-secondary trash"
                @click.prevent="removeCartItem(item.product.id)">
                  <i class="far fa-trash-alt " aria-hidden="true"></i>
                </a>
              </td>
              <td  class="image align-middle" width="100">
                <img
                  :src="item.product.imageUrl[0]"
                  :alt="item.product.title"
                  width="100%"
                />
              </td>
              <td class="align-middle">
                {{ item.product.title }}
              </td>
              <td class="d-flex align-items-center  justify-content-center countNumber" width="100">
                <button
                class="btn minus btn-primary"
                type="button"
                :disabled="item.quantity == 1"
                @click="item.quantity --;
                updateQuantity(item.product.id , item.quantity)"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input type="number"
                max="10" min="1"
                class="productNumber text-center form-control rounded-0"
                v-model="item.quantity"
                @change="updateQuantity(item.product.id , item.quantity)"
                />
                <button
                class="btn add btn-primary"
                type="button"
                @click="item.quantity ++;
                updateQuantity(item.product.id , item.quantity)"
                :disabled="loadingCart === item.product.id"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </td>
              <td class="align-middle text-right">{{ item.product.price | currency }}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <table class="table mt-4x">
            <tbody class="text-secondary">
              <tr>
                <td colspan="4" class="text-right">
                  <strong>運費</strong>
                </td>
                <td class="text-right">
                  <strong>${{ shippingFee }}</strong>
                </td>
              </tr>
              <tr class="h5 text-dark">
                <td colspan="4" class="text-right">
                  <strong>共計</strong>
                </td>
                <td class="text-right">
                  <strong>{{ cartTotal + shippingFee | currency }}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-row" v-if="cart.length">
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
  </div>
</template>

<script>
import Progressbar from '@/components/StepProgress.vue';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Cart',
  components: {
    Progressbar,
    AlertMessage,
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
        vm.products = res.data.data;
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
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
        if (vm.cartTotal < 1000) {
          vm.shippingFee = 60;
        }
      } else {
        vm.shippingFee = 0;
      }
    },
    updateQuantity(id, quantity) {
      const vm = this;
      vm.loadingCart = id;
      if (quantity > 10) {
        vm.$bus.$emit('message:push',
          '數量不可超過 10 喔!', 'danger');
      } else if (quantity < 1) {
        vm.$bus.$emit('message:push',
          '數量不可少於 1 喔!', 'danger');
      } else {
        vm.isLoading = true;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
        const cart = {
          product: id,
          quantity,
        };
        vm.$http.patch(url, cart).then(() => {
          vm.loadingCart = '';
          vm.getCart();
          vm.isLoading = false;
        });
      }
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      vm.isLoading = true;
      vm.$http.delete(api).then(() => {
        vm.getCart();
        vm.$bus.$emit('getcart');
        vm.isLoading = false;
      });
    },
    addCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      vm.isLoading = true;
      vm.$http.post(api, { code: this.coupon_code }).then((res) => {
        vm.coupon = res.data.data;
        vm.$bus.$emit('message:push',
          '成功使用優惠券。', 'success');
        vm.isLoading = false;
      }).catch((error) => {
        const errorData = error.response.data.message;
        vm.$bus.$emit('message:push',
          `${errorData}`, 'danger');
        vm.isLoading = false;
      });
    },
    goToCheck() {
      this.$router.push('/checkout');
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
#cart {
  min-height: 100vh;
}
.cartdetail {
  max-width: 900px;
  margin: 0 auto;
}

// table
.cartinfo {
  .trash {
    &:hover {
      color:red !important;
    }
  }
}
@media (max-width: 576px) {
  .cartinfo {
    .image {
      display: none
    }
  }
}
.table td {
  border: none;
  margin: 0.5rem;
}

// coupon
.couponuse {
  input {
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  }
}
// 數量
.countNumber {
  max-width: 100px;
    .add,
    .minus,
    .productNumber {
      min-height: 38px;
      padding: 2px 8px;
      border: 1px solid #00346D;
    }

    .add {
      border-radius: 0 3px 3px 0;
    }

    .minus {
      border-radius: 3px 0 0 3px;
    }

    .productNumber {
      text-align: center;
      min-width: 50px;

    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
}
@media (max-width: 576px) {
  .countNumber {
      .productNumber {
        min-width: 38px;
        font-size: 16px;
      }

      .add,
      .minus {
        font-size: 12px;
      }
    }
}

</style>
