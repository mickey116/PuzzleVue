<template>
  <div>
  <Loading :active.sync="isLoading"></Loading>
  <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th  width="120">購買時間</th>
        <th >購買款項</th>
        <th width="100">應付金額</th>
        <th width="100">付款方式</th>
        <th width="120">是否付款</th>
        <th >買家備註</th>
      </tr>
    </thead>
    <tbody v-if="orders.length">
      <tr v-for="(item) in orders" :key="item.id"
        :class="{'text-secondary': !item.paid}">
        <th>{{ item.created.datetime }}</th>
        <th>
          <ul class="list-unstyled">
            <li v-for="(product,key) in item.products" :key="key">
              {{ product.product.title }}  數量：{{ product.quantity }}
              {{ product.product.unit }}
            </li>
          </ul>
        </th>
        <th class="text-right">
          {{ item.amount | currency }}
        </th>
        <th>
          {{ item.payment }}
        </th>
        <td>
          <div class="custom-control custom-switch">
            <input
              :id="item.id"
              v-model="item.paid"
              type="checkbox"
              class="custom-control-input"
              @change="setOrderPaid(item)"
            >
            <label
              class="custom-control-label"
              :for="item.id"
            >
              <strong
                v-if="item.paid"
                class="text-success"
              >已付款</strong>
              <span
                v-else
                class="text-muted"
              >尚未付款</span>
            </label>
          </div>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <Pagination :pages="pagination" @emitpage="getOrders"
  v-if="pagination.total_pages >= 2"></Pagination>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Orderlist',
  components: {
    Pagination,
  },
  data() {
    return {
      orders: {
        user: {
          email: '',
        },
      },
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      // API
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.orders = res.data.data;
        vm.pagination = res.data.meta.pagination;
        vm.isLoading = false;
      });
    },
    setOrderPaid(item) {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      vm.$http.patch(api, item.id).then(() => {
        vm.$bus.$emit('message:push',
          '付款狀態已修改',
          'success');
        vm.getOrders();
      });
    },
  },
  created() {
    this.getOrders();
  },

};
</script>

<style>

</style>
