<template>
  <div id="goodsdetail" class="container">
    <AlertMessage></AlertMessage>
    <div class="row mt-3">
      <div class="col-md">
        <!-- breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/home">首頁</router-link></li>
            <li class="breadcrumb-item"><router-link to="/goods">產品列表</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">
              {{product.category}} - {{product.title}}</li>
          </ol>
        </nav>
        <img :src="product.imageUrl" alt="" class="w-100" height="350">
        <p class="mt-3 mb-1 text-secondary">商品說明 - </p>
        <p>{{product.content}}</p>
      </div>
      <div class="col-md detail">
        <h3>
          <i class="fas fa-puzzle-piece"></i>
          {{product.title}}</h3>
        <p class="h5 text-right text-secondary mb-5"> - {{product.description}}</p>
        <div class="d-flex flex-column mb-4 text-right price">
          <span class="text-secondary"><del>原價：${{product.origin_price}}</del></span>
          <span class="text-danger h5">特價：${{product.price}}</span>
        </div>
        <div class="row addCart">
          <div class="col-md mb-3">
            <select name="" class="form-control" v-model="product.num">
              <option value="0" disabled selected>
                請選擇數量
              </option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
            <!-- <div class="input-group mx-auto">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-quietpink">-</button>
              </div>
              <input type="number" min="1" class="form-control text-center" value="1">
              <div class="input-group-append">
                <button type="button" class="btn btn-quietpink">+
                </button>
              </div>
            </div> -->
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
    <section>
      <h4 class="text-center">相關產品</h4>
      <div class="row similar mt-4">
        <div class="col-md-4 mb-4" v-for="item in similar" :key="item.id">
          <a href="#" @click.prevent="goToSimilar(item.id)">
            <img :src="item.imageUrl" class="img-fluid w-100 h-100">
          </a>
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
      product: {},
      similar: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.data;
        vm.similar = [];
        vm.products.forEach((item) => {
          if (vm.product.category === item.category && vm.product.id !== item.id) {
            vm.similar.push(item);
          } else if (vm.product.id === item.id) {
            this.getProducts();
          }
        });
      });
    },
    getProduct() {
      const vm = this;
      const { id } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      vm.$http.get(url).then((res) => {
        console.log(res);
        vm.product = res.data.data;
        // 預設數量
        vm.product.num = 1;
      });
    },
    goToSimilar(similarid) {
      this.$router.push(`/goodsdetail/${similarid}`);
      this.getProduct();
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
        this.$bus.$emit('getcart');
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
  },
};

</script>

<style lang="scss">
.breadcrumb{
  background: transparent;
  a {
    &:hover {
      text-decoration: none;
      color: #007bff;
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
// similar
// .similar {
//   margin: 30px 0;
// }
</style>
