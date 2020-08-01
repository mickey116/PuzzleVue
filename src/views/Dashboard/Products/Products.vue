<template>
  <div>
    <h2>這裡是後台產品頁面</h2>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['token'],
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      // 取得 token 的 cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      // Dashboard 跑一次就好
      // vm.token = document.cookie.replace(/(?:(?:^|.*;\s*)hastoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // vm.$http.defaults.common.headers.Authorization = `Bearer ${vm.token}`;

      // API
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      vm.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.data;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
