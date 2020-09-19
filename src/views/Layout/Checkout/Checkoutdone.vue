<template>
  <div id="checkoutdone" class="container">
    <!-- progress -->
    <Progressbar></Progressbar>
    <h5 class="text-center py-3 bg-quietpink rounded">
      <i class="far fa-check-circle text-success mr-2"></i>
      感謝您的訂購，以下是您本次購物交易詳細。
    </h5>
    <div class="row">
      <div class="col done my-5">
        <table class="table text-center table-bordered">
          <tbody>
            <tr style="background:#c5cae9;">
              <th>訂單編號</th>
              <th>{{order.updated.timestamp}}</th>
            </tr>
            <tr>
              <td>購買者姓名</td>
              <td> {{order.user.name}}</td>
            </tr>
            <tr>
              <td>購買者電話</td>
              <td> {{order.user.tel}}</td>
            </tr>
            <tr>
              <td>付款方式</td>
              <td> {{order.payment}}</td>
            </tr>
            <tr>
              <td>應付金額</td>
              <td> {{order.amount}}</td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td>
                <span v-if="!order.paid">尚未付款</span>
                <div v-if="order.paid === false" class="mt-3">
                  <button class="btn-danger btn" @click="payOrder">確認付款</button>
                </div>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row mt-4">
          <div class="col">
            <router-link to="/home" class="btn btn-outline-primary btn-block">回首頁</router-link>
          </div>
          <div class="col">
            <router-link to="/home" class="btn btn-primary btn-block">繼續購物</router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Progressbar from '@/components/StepProgress.vue';

export default {
  name: 'CheckoutDone',
  components: {
    Progressbar,
  },
  data() {
    return {
      order: {
        updated: 0,
        user: {},
      },
      orderId: '',
      orderDetail: [],
      coupon: {},
      coupon_code: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        console.log(res);
        vm.order = res.data.data;
        vm.orderDetail = res.data.data.products;
        // vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${vm.orderId}/paying`;
      vm.isLoading = true;
      vm.$http.post(api).then(() => {
        vm.order.paid = true;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
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
        color: white;
        background-color: #49599a;
      }
    }
    &:nth-child(2) {
      &:before {
        content: "\f00c";
        font-weight: 800;
        font-family: "Font Awesome 5 Free";
        border-color: #49599a;
        color: white;
        background-color: #49599a;
      }
      color:#49599a;
    }
    &:last-child {
      &:before {
        content: "\f00c";
        font-weight: 800;
        font-family: "Font Awesome 5 Free";
        border-color: #49599a;
        color: white;
        background-color: #49599a;
      }
      &:after {
        background-color: #49599a;
      }
      color:#49599a;
    }
  }
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
//card
// .card-header {
//   border-bottom: none;
//   background-color: #c5cae9;
// }
.done {
  max-width: 500px ;
  margin: 0 auto;
  .table {
    border: 2px solid #c5cae9;
  }
}
</style>
