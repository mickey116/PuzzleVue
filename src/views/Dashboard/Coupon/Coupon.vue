<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button class="btn btn-info" @click="openCouponModal('create')">建立新的優惠券</button>
    </div>
    <table class="table mt-4 text-center">
      <thead>
        <tr class="text-center">
          <th>名稱</th>
          <th width="120">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody v-if="coupons.length">
        <tr v-for="( item,key ) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.deadline.datetime }}</td>
          <td>
            <span v-if="item.enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <a href="#" class="text-warning mr-4" @click.prevent="openCouponModal('edit', item)">
              <i class="far fa-edit"></i>
            </a>
            <a href="#" class="text-danger" @click.prevent="openCouponModal('delete', item)">
              <i class="far fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination :pages="pagination" @emitpage="getCoupons"
    v-if="pagination.total_pages >= 2"></Pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="status === 'create'">新增優惠券</span>
              <span v-else>編輯 {{ tempCoupon.title }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                id="due_date"
                v-model="due_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="due_time">到期時間</label>
              <input
                id="due_time"
                v-model="due_time"
                type="time"
                step="1"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.enabled"
                  id="enabled"
                />
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              {{ status === 'create' ? '新增優惠卷' : '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DelModoal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Coupon',
  components: {
    Pagination,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: '',
        code: '',
      },
      due_date: '',
      due_time: '',
      status: '',
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`;
      vm.isLoading = true;
      this.axios.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.data;
        vm.pagination = response.data.meta.pagination;
      });
    },
    openCouponModal(status, item) {
      const vm = this;
      vm.status = status;
      switch (status) {
        case 'create':
          vm.tempCoupon = {};
          $('#couponModal').modal('show');
          break;
        // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          vm.tempCoupon = { ...item };
          // 使用 split 切割相關時間戳
          const deadlineAt = vm.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadlineAt; // 日期
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          vm.tempCoupon = { ...item };
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.tempCoupon.id}`;
      vm.axios.delete(api).then((res) => {
        $('#delCouponModal').modal('hide');
        if (res.status === 200) {
          vm.$bus.$emit('message:push', '刪除成功', 'success');
          vm.getCoupons();
        } else {
          vm.$bus.$emit('message:push', `${res.data.message}`, 'danger');
          vm.getCoupons();
        }
        vm.isLoading = false;
      });
    },
    updateCoupon() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = '';
      let status = '新增優惠券成功';
      if (vm.status === 'create') {
        httpMethod = 'post';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.tempCoupon.id}`;
        status = '更新優惠券成功';
        httpMethod = 'patch';
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      // API
      vm.$http[httpMethod](api, vm.tempCoupon).then((res) => {
        $('#couponModal').modal('hide');
        if (res.status === 200) {
          this.$bus.$emit('message:push',
            status,
            'success');
          vm.getCoupons();
        } else {
          vm.$bus.$emit('message:push',
            `${res.data.message}`,
            'danger');
        }
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style>
</style>
