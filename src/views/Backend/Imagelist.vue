<template>
  <div>
    <Loading :active.sync="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th>圖片縮圖</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="storages.length">
        <tr
          v-for="(item, key) in storages"
          :key="key"
        >
          <td>
            <img
              :src="item.path"
              :alt="item.id"
              width="100px"
              class="img-fluid"
            >
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-outline-danger"
                @click.prevent="openModel(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitpage="getData"
    v-if="pagination.total_pages >= 2" />
    <div
      id="deleteModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除資料</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除該筆資料 (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteData"
            >
              確認刪除
            </button>
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
  name: 'Imagelist',
  components: {
    Pagination,
  },
  data() {
    return {
      storages: {},
      tempData: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getData(page = 1) {
      const vm = this;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;
      vm.$http.get(api).then((res) => {
        vm.storages = res.data.data;
        vm.pagination = res.data.meta.pagination;
        vm.isLoading = false;
      });
    },
    openModel(item) {
      $('#deleteModal').modal('show');
      this.tempData = { ...item };
    },
    deleteData() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempData.id}`;
      this.$http.delete(api).then(() => {
        $('#deleteModal').modal('hide');
        this.$bus.$emit('message:push',
          '刪除成功',
          'success');
        this.getData();
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
