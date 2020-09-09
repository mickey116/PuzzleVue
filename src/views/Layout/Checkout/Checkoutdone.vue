<template>
  <div id="checkoutdone" class="container">
    <!-- progress -->
    <Progressbar></Progressbar>
    <h5 class="text-center py-3 bg-quietpink rounded">
      <i class="far fa-check-circle text-success mr-2"></i>
      感謝您的訂購，以下是您本次購物交易詳細。
    </h5>
    <div class="row">
      <!-- <div class="col-md done">
        <span>訂單編號：</span>
      </div>
      <div class="col-md">
        <div class="card mb-4 border-0">
          <div class="card-header text-center">
            <strong>購買詳情</strong>
          </div>
          <div class="card-body bg-quietpink">
          </div>
        </div>

      </div> -->
      <div class="col done my-5">
        <table class="table text-center table-bordered">
          <tbody>
            <tr style="background:#c5cae9;">
              <th>訂單編號</th>
              <th>12345</th>
            </tr>
            <tr>
              <td>付款方式</td>
              <td></td>
            </tr>
            <tr>
              <td>應付金額</td>
              <td></td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
      order: {},
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        // console.log(res);
        vm.order = res.data.data;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${vm.orderId}/paying`;
      vm.isLoading = true;
      vm.$http.get(api).then(() => {
        // console.log(res);
        // vm.order = res.data.data;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$router.params.orderId;
    console.log(this.orderId);
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
