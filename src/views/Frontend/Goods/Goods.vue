<template>
  <div id="goods" class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <AlertMessage></AlertMessage>
    <!-- banner -->
    <div class="banner mb-4  mt-3 mt-lg-0" :style="{backgroundImage: `url(${img.banner})` }">
    </div>
    <!-- main -->
    <div class="row">
      <div class="col-3">
        <h5 class="text-center title">
          <i class="fas fa-puzzle-piece d-none d-md-inline-block"></i>
          產品類別
        </h5>
        <ul class="list-group text-center">
          <li class="list-group-item">
            <a href="#"
            :class="{ active: filterType === 'Travel' }"
            @click.prevent="getFilter(filterType = 'Travel')">旅行</a>
          </li>
          <li class="list-group-item">
            <a href="#"
            :class="{ active: filterType === 'Nature' }"
            @click.prevent="getFilter(filterType = 'Nature')">自然</a>
          </li>
          <li class="list-group-item">
            <a href="#"
            :class="{ active: filterType === 'Flowers' }"
            @click.prevent="getFilter(filterType = 'Flowers')">花卉</a>
          </li>
          <li class="list-group-item">
            <a href="#"
            :class="{ active: filterType === 'Animals' }"
            @click.prevent="getFilter(filterType = 'Animals')">動物</a>
          </li>
          <li class="list-group-item">
            <a href="#"
            :class="{ active: filterType === 'Custom' }"
            @click.prevent="getFilter(filterType = 'Custom')">客製化拼圖</a>
          </li>
        </ul>
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-md-6 mb-4" v-for="item in newProducts" :key="item.id">
            <div class="card shadow-sm h-100">
              <div class="card-head">
                <router-link :to="`/goodsdetail/${item.id}`">
                  <img :src="item.imageUrl[0]" :alt="item.title"
                  class="w-100 card-img-top img-md-fluid">
                </router-link>
                <div class="info">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                  <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                </div>
              </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Goods',
  components: {
    AlertMessage,
  },
  data() {
    return {
      products: [],
      newProducts: [],
      isLoading: false,
      filterType: 'Travel',
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/JmgReiZHDg7yjqzHTiUaZFBtOVdJVI4Zlpaeiygc1pwPwwxW6udpRZMMZIUczHFAJramsTDIuwnWgIgboFgL31wgkqpB2D6YmQqznxaKDU1vF95zSTZlR5peeKiKXGvo.jpeg',
      },
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
        vm.getFilter();
      });
    },
    getFilter() {
      switch (this.filterType) {
        case 'Travel':
          this.newProducts = this.products.filter((item) => item.category === 'Travel');
          break;
        case 'Nature':
          this.newProducts = this.products.filter((item) => item.category === 'Nature');
          break;
        case 'Flowers':
          this.newProducts = this.products.filter((item) => item.category === 'Flower');
          break;
        case 'Animals':
          this.newProducts = this.products.filter((item) => item.category === 'Animal');
          break;
        case 'Custom':
          this.newProducts = this.products.filter((item) => item.category === 'Customize');
          break;
        default:
          break;
      }
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.isLoading = true;
      vm.$http.post(url, cart).then(() => {
        vm.isLoading = false;
        vm.$bus.$emit('message:push',
          '加入購物車成功', 'success');
        this.$bus.$emit('getcart');
      }).catch((error) => {
        vm.isLoading = false;
        const errorData = error.response.data.errors[0];
        vm.$bus.$emit('message:push',
          `${errorData}`, 'danger');
      });
    },
  },
  created() {
    this.getProducts();
  },

};
</script>

<style lang="scss">
// banner
.banner {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 250px;
  position: relative;
  opacity: 0.7;
}

@media (max-width: 767.98px) {
  .banner {
    height: 180px;
    margin-top: 15px;
  }
}

// list
.title {
  color:#00346D;
  margin: 0;
  padding: 12px 0;
  border-bottom: 2px solid #00346D;
}
.list-group {
  border:none;
  .list-group-item {
    border:none;
    border-bottom: 2px dotted #00346D;
    font-size: 18px;
    padding: 0;
    a {
      text-decoration: none;
      display: block;
      padding: 12px 0;
    }
    .active {
      color:white;
      background: #00346D;
    }
  }
}
// card
.card {
  border: none;
  .card-head {
    position: relative;
    // img {
    //   height: 300px;
    // }
  }
  .info {
    width: 100%;
    position: absolute;
    bottom: 15px;
    display: flex;
    justify-content: space-between;
    padding:0 15px;
    font-size: 22px;
    .detaillogo{
      display: block;
      text-indent: 9px;
      width: 46.75px;
      border: 1px solid #fff;
      border-radius: 50%;
      background: #fff;
      color: #00346D;
      cursor: pointer;
      i{
        padding-top:9px;
      }
    }
    .cartlogo i{
      display: block;
      padding: 10px;
      border: 1px solid #fff;
      border-radius: 50%;
      background: #fff;
      color: #00346D;
      cursor: pointer;
    }
  }
}
@media (min-width: 768px) {
  .card {
      .card-head {
        img {
          object-fit: cover;
          height: 300px;
        }
    }
  }
}
</style>
