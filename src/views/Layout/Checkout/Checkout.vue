<template>
  <div class="container" id="checkout">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- progress -->
    <Progressbar></Progressbar>

    <!-- 折疊選單 -->
    <div class="row justify-content-center mt-4">
      <div class="col mb-4">
        <div class="accordion" id="accordionExample">
          <div class="card border-bottom rounded shadow-sm">
            <div class="card-header bg-white text-center" id="headingOne">
              <button
                class="btn"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <div>
                  <strong class="h5">共計：
                    <span class="text-danger" v-if="coupon.enabled">
                      {{cartTotal * (coupon.percent / 100)}}
                    </span>
                    <span class="text-danger" v-else> {{cartTotal + shippingFee}}
                    </span>
                    元
                  </strong>
                  <br>
                  <strong class="d-block d-flex">
                    <span>顯示購物車細節 ({{cart.length}})</span>
                    <i class="fas fa-sort-down menuopen ml-3 "></i>
                    <i class="fas fa-sort-up menuclose ml-3 pt-2"></i>
                  </strong>
                </div>
              </button>
            </div>
          </div>
          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <table class="table text-center">
              <tbody>
                <tr v-for="item in cart" :key="item.product.id + 1">
                  <td width="100">
                    <img
                      :src="item.product.imageUrl"
                      alt
                      width="100%"
                    />
                  </td>
                  <td class="align-middle" colspan="2">{{item.product.title}}</td>
                  <td class="align-middle" width="100">
                    {{item.quantity}} {{item.product.unit}}
                  </td>
                  <td class="align-middle text-right" width="50">${{item.product.price}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="coupon">
                  <td colspan="3" class="align-middle text-right">
                    <i class="fas fa-ticket-alt"></i>
                    優惠券代碼
                  </td>
                  <td class="align-middle">
                    <input type="text" v-model="coupon_code"/>
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
          </div>
        </div>
      </div>
    </div>

    <!-- 付款資料 -->
      <div class="row">
        <div class="col-md">
            <div class="card mb-4 border-0">
              <div class="card-header text-center">
                <strong>寄送及付款方式</strong>
              </div>
              <div class="card-body bg-quietpink">
                <form>
                  <div class="form-group">
                    <label for="send">寄送方式</label>
                    <select v-model="form.send"
                    class="form-control" required>
                      <option value="" disabled>
                        請選擇寄送方式
                      </option>
                      <option value="blackcat">
                        黑貓宅急便
                      </option>
                      <option value="postsend">
                        郵局宅配
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="payment">付款方式</label>
                    <select v-model="form.payment"
                    class="form-control" required>
                      <option value="" disabled>
                        請選擇付款方式
                      </option>
                      <option value="WebATM">
                        WebATM
                      </option>
                      <option value="ATM">
                        ATM
                      </option>
                      <option value="CVS">
                        CVS
                      </option>
                      <option value="Barcode">
                        Barcode
                      </option>
                      <option value="Credit">
                        Credit
                      </option>
                      <option value="ApplePay">
                        ApplePay
                      </option>
                      <option value="GooglePay">
                        GooglePay
                      </option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div class="card mb-4 border-0">
              <div class="card-header text-center">
                <strong>信用卡資訊</strong>
              </div>
              <div class="card-body bg-quietpink">
                  <form>
                    <div class="form-group">
                      <validation-provider v-slot="{ errors, classes }" rules="required"
                      name="持卡人姓名">
                        <label for="creditname">持卡人姓名</label>
                        <input id="creditname" type="text" v-model="credit.name"
                        class="form-control" :class="classes"
                        placeholder="YOU, XIAO-MING">
                        <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group">
                      <validation-provider v-slot="{ errors, classes }" rules="required"
                      name="信用卡卡號">
                        <label for="creditnumber">信用卡卡號</label>
                        <input id="creditnumber" v-model="credit.number" type="text"
                        class="form-control" :class="classes"
                        placeholder="XXXX-XXXX-XXXX-XXXX">
                        <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md">
                        <validation-provider v-slot="{ errors, classes }" rules="required"
                        name="有效日期">
                          <label for="exdate">有效日期</label>
                          <input id="exdate" v-model="credit.exdate" type="text"
                          class="form-control" :class="classes"
                          placeholder=" MM / YY ">
                          <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md">
                        <validation-provider v-slot="{ errors, classes }" rules="required"
                        name="持卡人姓名">
                          <label for="backnumber">安全碼 (CVC)</label>
                          <input id="backnumber" type="text" v-model="credit.backnumber"
                          class="form-control" :class="classes"
                          placeholder="XXX">
                          <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
        </div>
        <div class="col-md mb-4">
          <validation-observer v-slot="{ invalid }">
            <div class="card h-100 border-0">
              <div class="card-header  text-center">
                <strong>顧客資訊</strong>
              </div>
              <div class="card-body bg-quietpink">
                <form @submit.prevent="createOrder">
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required"
                    name="姓名">
                      <label for="username">收件人姓名</label>
                      <input id="username" v-model="form.name" type="text"
                      class="form-control" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="email|required"
                    name="Email">
                      <label for="email">Email</label>
                      <input id="email" v-model="form.email" type="email"
                      class="form-control" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required|min:8"
                    name="聯絡電話">
                      <label for="tel">聯絡電話</label>
                      <input id="tel" v-model="form.tel" type="tel"
                      class="form-control" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required"
                    name="地址">
                      <label for="address">收件地址</label>
                      <input id="address" v-model="form.address" type="text"
                      class="form-control" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label for="message">訂單備註</label>
                    <textarea id="message" v-model="form.message"
                    class="form-control" cols="30" rows="3"
                    placeholder="若使用轉帳服務，請於轉帳完成後，將轉帳後五碼留言於此。">
                    </textarea>
                  </div>
                  <div class="form-row mt-5">
                    <div class="col">
                      <button class="btn btn-outline-secondary btn-block" @click="goToCart">
                        <i class="fas fa-arrow-left mr-2"></i>
                        回購物車
                      </button>
                    </div>
                    <div class="col">
                      <button class="btn btn-primary btn-block" :disabled="invalid" type="submit">
                        提交訂單
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import Progressbar from '@/components/StepProgress.vue';

export default {
  name: 'Checkout',
  components: {
    Progressbar,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
        send: '',
      },
      credit: {
        name: '',
        exdate: '',
        number: '',
        backnumber: '',
      },
      cart: {},
      cartTotal: 0,
      shippingFee: 0,
      isLoading: false,
      coupon: {},
      coupon_code: '',
      order: {},
    };
  },
  methods: {
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
        if (vm.cartTotal < 1000) {
          vm.shippingFee = 60;
        }
      } else {
        vm.shippingFee = 0;
      }
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
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      // vm.isLoading = true;
      vm.$http.post(api, vm.form).then((res) => {
        console.log('訂單已建立', res);
        vm.isLoading = false;
        vm.order = res.data.data;
        vm.$router.push(`/checkoutdone/${res.data.data.id}`);
      }).catch((err) => {
        vm.isLoading = false;
        console.log('欄位不完整', err);
      });
    },
    goToCart() {
      this.$router.push('/cart');
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss">
body {
  input {
    outline: none;
  }
  .form-control {
    border: none;
  }
}
// navbar
.custom-navbar {
  padding-top: 35.5px;
  #navbarNav {
    padding: 8px 0 !important;
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
//progressbar
.progressbar {
  li {
    &:first-child {
      &:before {
        content: "\f00c";
        font-weight: 800;
        font-family: "Font Awesome 5 Free";
        background-color: #49599a;
        color: white;
      }
    }
    &:nth-child(2) {
      color: #49599a;
      &:before {
        border-color: #49599a;
      }
    }
    &:last-child {
      &:after {
        background-color: #49599a;
      }
    }
  }
}
//card
.card-header {
  border-bottom: none;
  background-color: #c5cae9;
}
// cartdetailmenu
.menuopen, .menuclose {
  font-size: 1.2rem;
}
[aria-expanded="false"] .menuopen {
  display: block;
}
[aria-expanded="false"] .menuclose {
  display: none;
}
[aria-expanded="true"] .menuopen {
  display: none;
}
[aria-expanded="true"] .menuclose {
  display: block;
}

// table
.table td{
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
