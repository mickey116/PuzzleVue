<template>
  <div id="goodsdetail" class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <AlertMessage></AlertMessage>
    <div class="row mt-3">
      <div class="col-md">
        <!-- breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/home">首頁</router-link></li>
            <li class="breadcrumb-item"><router-link to="/goods">產品列表</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ product.category }} - {{ product.title }}</li>
          </ol>
        </nav>
        <img :src="product.imageUrl[0]" alt="" class="img-fluid">
        <p class="mt-3 mb-1 text-secondary">商品說明 - </p>
        <p>{{ product.content }}</p>
      </div>
      <div class="col-md detail">
        <h3>
          <i class="fas fa-puzzle-piece"></i>
          {{ product.title }}</h3>
        <p class="h5 text-right text-secondary mb-5"> - {{ product.description }}</p>
        <div class="d-flex flex-column mb-4 text-right price">
          <span class="text-secondary"><del>原價：${{ product.origin_price }}</del></span>
          <span class="text-danger h5">特價：${{ product.price }}</span>
        </div>
        <div class="row addCart">
          <div class="col-md mb-3">
            <select name="" class="form-control" v-model="product.num">
              <option value="0" disabled selected>
                請選擇數量
              </option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="col-md">
            <div>
              <button class="btn btn-primary btn-block"
              @click="addToCart(product.id, product.num)">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <!-- similar -->
    <section class="similar">
      <h4 class="text-center mb-3">相關產品</h4>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in relatedProducts"
        :key="item.id" @click="getProduct()">
          <div class="card h-100">
            <router-link :to="`/goodsdetail/${item.id}`">
              <img :src="item.imageUrl[0]" :alt="item.title" class="img-fluid w-100">
            </router-link>
            <router-link :to="`/goodsdetail/${item.id}`" class="text-decoration-none card-body">
                <h6>{{ item.title }}</h6>
                <div class="d-flex justify-content-between">
                  <span class="text-secondary">
                    <del>原價：{{ item.origin_price | currency }}</del
                  ></span>
                  <span class="text-danger h5">特價：{{ item.price | currency }}</span>
                </div>
              </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Goodsdetail',
  components: {
    AlertMessage,
  },
  data() {
    return {
      products: [],
      product: {
        imageUrl: [],
      },
      similar: [],
      isLoading: false,
      relatedProducts: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.products = res.data.data;
        vm.isLoading = false;
      });
    },
    getProduct() {
      const vm = this;
      vm.relatedProducts = [];
      const { id } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.product = res.data.data;
        // 預設數量
        vm.product.num = 1;
        vm.isLoading = false;
      }).catch(() => {
        vm.isLoading = false;
      });
    },
    getRelated() {
      const vm = this;
      vm.relatedProducts = [];
      const { id } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      vm.isLoading = true;
      vm.$http.get(url).then(() => {
        vm.products.forEach((item) => {
          // products內產品的種類=此產品種類 && 排除此產品
          if (item.category === vm.product.category && item.id !== id) {
            vm.relatedProducts.push(item);
          }
        });
        vm.isLoading = false;
      }).catch(() => {
        vm.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.$http.post(url, cart).then(() => {
        // console.log(res);
        vm.$bus.$emit('message:push',
          '加入購物車成功', 'success');
        vm.$bus.$emit('getcart');
      }).catch((error) => {
        // console.log(error.response.data);
        const errorData = error.response.data.errors[0];
        vm.$bus.$emit('message:push',
          `${errorData}`, 'danger');
      });
    },
  },
  created() {
    this.getProducts();
    this.getProduct();
    this.getRelated();
  },
};

</script>

<style lang="scss">
.breadcrumb{
  background: transparent;
  a {
    &:hover {
      text-decoration: none;
      color: #024ea0;
    }

  }
}
.detail {
  h3 {
    margin-top: 80px;
  }
  .price {
    margin-top: 100px;
  }
  .addCart {
    .form-control {
      border: 1px solid #00346D;;
    }
  }
}
@media (max-width: 756px) {
  .detail {
    h3 {
      margin-top: 30px;
    }
    .price {
    margin-top: 24px;
  }
  }
}
// 相關產品
@media (min-width: 768px) {
  .similar {
    img {
    max-width: 100%;
    height: 230px;
    }
  }
}

</style>
