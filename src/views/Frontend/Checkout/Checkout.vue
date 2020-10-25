<template>
  <div class="container" id="checkout">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- progress -->
    <Progressbar></Progressbar>
    <AlertMessage/>

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
                      {{ cartTotal * (coupon.percent / 100) }}
                    </span>
                    <span class="text-danger" v-else> {{ cartTotal + shippingFee | currency }}
                    </span>
                    元
                  </strong>
                  <br>
                  <strong class="d-block d-flex">
                    <span>顯示購物車細節 ({{ cart.length }})</span>
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
                      :src="item.product.imageUrl[0]"
                      :alt="item.product.title"
                      width="100%"
                    />
                  </td>
                  <td class="align-middle" colspan="2">{{ item.product.title}}</td>
                  <td class="align-middle" width="80">
                    {{ item.quantity }} {{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right"
                  >{{ item.product.price | currency }}</td>
                </tr>
              </tbody>
            </table>
            <div class="input-group d-flex align-items-center
            justify-content-end container couponuse">
              <span>
                <i class="fas fa-ticket-alt"></i>
                優惠券代碼
              </span>
              <input class="ml-3" type="text" v-model="coupon_code" />
              <a href="#" @click.prevent="addCoupon" class="ml-3">
                <i class="far fa-paper-plane"></i>
              </a>
            </div>
            <div class="text-right container mt-4 text-secondary fee">
              <p class=" mb-4">
                <span><strong>運費</strong></span>
                <span><strong>{{ shippingFee | currency }}</strong></span>
              </p>
              <p class=" text-dark mb-4">
                <span><strong>共計</strong></span>
                <span><strong>{{ cartTotal + shippingFee | currency }}</strong></span>
              </p>
              <p class="h5 text-dark mb-4" v-if="coupon.enabled">
                <span><strong>優惠價</strong></span>
                <span class="text-success">
                  <strong>{{ cartTotal * (coupon.percent / 100) | currency }}</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 付款資料 -->
      <div class="row">
        <div class="col-md">
            <div class="card mb-4">
              <div class="card-header text-center">
                <strong>寄送及付款方式</strong>
              </div>
              <div class="card-body">
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
            <div class="card mb-4" v-if="form.payment === 'Credit'">
              <div class="card-header text-center">
                <strong>信用卡資訊</strong>
              </div>
              <div class="card-body">
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
                        name="安全碼">
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
            <div class="card h-100">
              <div class="card-header  text-center">
                <strong>顧客資訊</strong>
              </div>
              <div class="card-body">
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
                      <button class="btn btn-outline-secondary btn-block"
                      @click="goToCart" type="button">
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
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Checkout',
  components: {
    Progressbar,
    ValidationObserver,
    AlertMessage,
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
    };
  },
  methods: {
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
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...vm.form };
      vm.isLoading = true;
      // coupon.enabled = ture 表示已執行過 addCoupon()，再將 coupon.code 放進 order
      if (vm.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      vm.$http.post(api, order).then((res) => {
        vm.order = res.data.data;
        if (vm.form.send !== '' && vm.form.send !== '' && vm.credit !== '') {
          vm.$router.push(`/checkoutdone/${res.data.data.id}`);
          vm.$bus.$emit('message:push',
            '訂單成功建立。', 'success');
        }
        vm.isLoading = false;
      }).catch(() => {
        vm.$bus.$emit('message:push',
          '訂單建立失敗，請確認每個欄位正確書寫。', 'danger');
        vm.isLoading = false;
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
//progressbar
.progressbar {
  li {
    &:first-child {
      &:before {
        content: "\f00c";
        font-weight: 800;
        font-family: "Font Awesome 5 Free";
        background-color: #00346D;
        color: white;
      }
    }

    &:nth-child(2) {
      color: #00346D;
      ;

      &:before {
        border-color: #00346D;
        ;
      }
    }

    &:last-child {
      &:after {
        background-color: #00346D;
        ;
      }
    }
  }
}

</style>
