<template>
  <div id="goods" class="container">
    <AlertMessage></AlertMessage>
    <!-- jumbo -->
    <div class="jumbotron jumbotron-fluid">
    </div>
    <!-- main -->
    <div class="row">
      <div class="col-4">
        <p class="h5 text-center title">
          <i class="fas fa-puzzle-piece"></i>
          產品類別
        </p>
        <div class="list-group text-center rounded-0" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action active" id="list-travel-list"
          data-toggle="list" href="#list-travel" role="tab" aria-controls="travel">旅行</a>
          <a class="list-group-item list-group-item-action" id="list-nature-list"
          data-toggle="list" href="#list-nature" role="tab" aria-controls="nature">自然</a>
          <a class="list-group-item list-group-item-action" id="list-flowers-list"
          data-toggle="list" href="#list-flowers" role="tab" aria-controls="flowers">花卉</a>
          <a class="list-group-item list-group-item-action" id="list-animals-list"
          data-toggle="list" href="#list-animals" role="tab" aria-controls="animals">動物</a>
          <a class="list-group-item list-group-item-action" id="list-custom-list"
          data-toggle="list" href="#list-custom" role="tab" aria-controls="custom">客製拼圖</a>
        </div>
      </div>
      <div class="col-8">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="list-travel" role="tabpanel"
          aria-labelledby="list-travel-list">
            <div class="row">
              <div class="col-md-6 mb-4" v-for="item in travel" :key="item.id">
                <div class="card shadow-sm h-100">
                  <img :src="item.imageUrl" class="card-img-top" height="170px">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                    <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                  <div class="card-body">
                    <p class="h6">{{item.title}}</p>
                    <div class="d-flex justify-content-between">
                      <span class="text-secondary"><del>原價：${{item.origin_price}}</del></span>
                      <span class="text-danger h5">特價：${{item.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-nature" role="tabpanel"
          aria-labelledby="list-nature-list">
            <div class="row">
              <div class="col-md-6 mb-4" v-for="item in nature" :key="item.id">
                <div class="card shadow-sm h-100">
                  <img :src="item.imageUrl" class="card-img-top" height="170px">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                    <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                  <div class="card-body">
                    <p class="h6">{{item.title}}</p>
                    <div class="d-flex justify-content-between">
                      <span class="text-secondary"><del>原價：${{item.origin_price}}</del></span>
                      <span class="text-danger h5">特價：${{item.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-flowers" role="tabpanel"
          aria-labelledby="list-flowers-list">
            <div class="row">
              <div class="col-md-6 mb-4" v-for="item in flowers" :key="item.id">
                <div class="card shadow-sm h-100">
                  <img :src="item.imageUrl" class="card-img-top" height="170px">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                    <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                  <div class="card-body">
                    <p class="h6">{{item.title}}</p>
                    <div class="d-flex justify-content-between">
                      <span class="text-secondary"><del>原價：${{item.origin_price}}</del></span>
                      <span class="text-danger h5">特價：${{item.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-animals" role="tabpanel"
          aria-labelledby="list-animals-list">
            <div class="row">
              <div class="col-md-6 mb-4" v-for="item in animals" :key="item.id">
                <div class="card shadow-sm h-100">
                  <img :src="item.imageUrl" class="card-img-top" height="170px">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                    <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                  <div class="card-body">
                    <p class="h6">{{item.title}}</p>
                    <div class="d-flex justify-content-between">
                      <span class="text-secondary"><del>原價：${{item.origin_price}}</del></span>
                      <span class="text-danger h5">特價：${{item.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-custom" role="tabpanel"
          aria-labelledby="list-custom-list">
            <div class="row">
              <div class="col-md-6 mb-4" v-for="item in custom" :key="item.id">
                <div class="card shadow-sm h-100">
                  <img :src="item.imageUrl" class="card-img-top" height="170px">
                  <router-link :to="`/goodsdetail/${item.id}`" class="detaillogo">
                    <i class="fas fa-info"></i>
                  </router-link>
                  <a class="cartlogo" @click.prevent="addToCart(item.id)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                  <div class="card-body">
                    <p class="h6">{{item.title}}</p>
                    <div class="d-flex justify-content-between">
                      <span class="text-secondary"><del>原價：${{item.origin_price}}</del></span>
                      <span class="text-danger h5">特價：${{item.price}}</span>
                    </div>
                  </div>
                </div>
              </div>
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
      // cart: {},
      travel: [],
      nature: [],
      flowers: [],
      animals: [],
      custom: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.$http.get(api).then((res) => {
        console.log(res.data);
        vm.products = res.data.data;
        vm.products.forEach((item) => {
          if (item.category === 'Travel') {
            vm.travel.push(item);
          } else if (item.category === 'Nature') {
            vm.nature.push(item);
          } else if (item.category === 'Flower') {
            vm.flowers.push(item);
          } else if (item.category === 'Animal') {
            vm.animals.push(item);
          } else {
            vm.custom.push(item);
          }
        });
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
  },

};
</script>

<style lang="scss">
// jumbotron
.jumbotron {
  background-image: url(https://images.unsplash.com/photo-1586224497705-389424b207fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  background-position: center center;
  opacity: 0.6;
  min-height: 350px;
}
// list
.title {
  margin: 0;
  padding: 12px 0;
  border-bottom: 2px dotted #283593;
}
.list-group {
  border:none;
  .list-group-item {
    border:none;
    border-bottom: 2px dashed #e8eaf6;
  }
  .list-group-item.active {
    background-color: #e8eaf6;
    color: black;
  }
}
// card
.card {
  position: relative;
  border: none;
  .detaillogo i {
    text-indent: 9px;
    width: 46.75px;
    font-size: 22px;
    padding: 10px;
    position: absolute;
    top:118px;
    left:10px;
    border: 1px solid #fff;//#00346D;
    border-radius: 50%;
    background: #fff;
    color: #00346D;
    cursor: pointer;
    &:hover {
      top:120px;
    }
  }
  .cartlogo i{
    font-size: 22px;
    padding: 10px;
    position: absolute;
    top:118px;
    right:10px;
    border: 1px solid #fff;//#00346D;
    border-radius: 50%;
    background: #fff;
    color: #00346D;
    cursor: pointer;
    &:hover {
      top:120px;
    }
  }
}
</style>
