<template>
  <div id="home">
    <!-- banner -->
    <div class="banner mb-4  mt-3 mt-lg-0" :style="{backgroundImage: `url(${images.banner})` }">
    </div>
    <section class="container new mb-5">
      <h3 class="titlefont text-center mt-3">
        - 新品上市 -
      </h3>
      <div class="row mt-5">
        <div class="col-md mb-3">
          <router-link to="/goods">
            <img src="https://images.unsplash.com/photo-1528638728766-d3b32415c65d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" class="w-100 rounded-circle">
            <h5 class="text-center mt-3 ">
              <i class="fas fa-star align-top"></i>
              花卉系列
            </h5>
          </router-link>
        </div>
        <div class="col-md mb-3">
          <router-link to="/goods">
            <img src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            class="w-100 rounded-circle" >
            <h5 class="text-center mt-3 h-100">
              <i class="fas fa-star align-top"></i>
              旅行系列</h5>
          </router-link>
        </div>
        <div class="col-md mb-3">
          <router-link to="/goods">
            <img src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            class="w-100 rounded-circle">
            <h5 class="text-center mt-3">
              <i class="fas fa-star align-top"></i>
              動物系列</h5>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 精選 -->
    <section class="select container">
      <div class="row">
        <div class="col selectword">
          <p class="contextfont">
            在拼圖的時候，<br>
            你能遠離一切煩惱！
          </p>
        </div>
        <div class="col selectimg px-0"></div>
      </div>

      <!-- <div class="row">
        <div id="carouselExampleFade" class="carousel slide carousel-fade my-5 col w-100"
          data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" style="background:url(https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80) no-repeat;background-position: center center; background-size:cover;">
            </div>
            <div class="carousel-item" style="background:url(https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) no-repeat;background-position: center center; background-size:cover;">
            </div>
            <div class="carousel-item" style="background:url(https://images.unsplash.com/photo-1544965850-6f8a66788f9b?ixlib=rb-1.2.1&
              auto=format&fit=crop&w=1082&q=80)
              no-repeat;background-position: center center; background-size:cover;">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleFade"
          role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleFade"
          role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="col select2word mt-5">
          <p class="contextfont ml-auto">
            還能，<br>
            看盡一切美景。
          </p>
        </div>
      </div> -->
    </section>
    <section class="container new mb-5">
      <h3 class="titlefont text-center mt-3">
        - 本月主打 -
      </h3>
      <div class="row mt-5">
        <div class="col-md mb-3" v-for="item in travel" :key="item.id">
          <div class="card h-100 text-center border-0">
            <img :src="item.imageUrl" class="w-100  rounded" height="194">
            <div class="card-footer border-top-0 py-2 border bg-white">
              <button class="btn btn-block " @click="addToCart(item.id)">
                <i class="fas fa-cart-plus mr-2"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客製化-->
    <section class="custom container">
      <div class="row mb-5">
        <div class="col-md customword d-flex">
          <div class="align-self-center">
            <button class="btn btn-primary" @click="goToGoods">
              <i class="fas fa-shopping-cart"></i>
              採購客製化拼圖</button>
          </div>
          <p class="contextfont">
            或者你可以將你的思念、<br>
            感謝，<br>
            寫在拼圖上，<br>
            送出去。
          </p>
        </div>
        <div class="col-md customimg"></div>
      </div>
    </section>
    <!-- 訂閱 -->
    <section class="subscribe">
      <div class="container">
        <div class="row">
          <div class="col-md"></div>
          <div class="col-md">
            <div class="input-group my-3">
              <input id="inputrSub"
                    type="text"
                    class="form-control border-0 rounded-0"
                    placeholder="訂閱我們獲得本月優惠碼"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-secondary rounded-0" type="button"
                id="button-addon2" data-toggle="modal" data-target="#subModal">
                <i class="far fa-envelope"></i>
                訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 訂閱Modal -->
    <div class="modal fade" id="subModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="far fa-check-circle text-info"></i>
              訂閱成功</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            恭喜您訂閱成功！<br>
            這是本月的優惠碼：<span class="text-danger">0815moon</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      images: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/d5ntapRTVnyNouFFrwajQojfdOsFQtxFm54uDOKMR88aNFqVHtMcPoeI8BuNASpjS2GZxpWUCJ7aR1UPTlP1jEI7VtWfZ5B89arHEUsQdc8cHRyDt1OkmCBvVIyCBDQH.jpeg',
      },
      products: {},
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.$http.get(api).then((res) => {
        // console.log(res.data);
        vm.products = res.data.data;
      });
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      vm.$http.post(url, cart).then((res) => {
        console.log(res);
        this.$bus.$emit('getcart');
      });
    },
    goToGoods() {
      this.$router.push('/goods');
    },
  },
  created() {
    // this.getProducts();
    // this.$bus.$on('getcart', () => {
    //   this.getCart();
    // });
  },
};
</script>

<style lang="scss">
// .titlefont {
//   font-family: 'ZCOOL KuaiLe', cursive;
// }
.contextfont {
  font-family: 'Noto Serif JP', serif;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  color: #197ca2;
  font-size: 36px;
}

// carousel
.carousel-item {
  height: 340px;
  opacity: 0.7;
  background-position: center center;
  background-size: cover;
}
// 新品上市
.new {
  h3 {
    color: #0e3e6e;
    border-bottom: 2px solid ;
  }
  a {
    min-height: 200px;
    color: #0e3e6e;
    &:hover {
      text-decoration: none;
      color: #4292a5;
    }
  }
}

// 小編精選
.select {
  .selectimg {
    background-image:url(https://images.unsplash.com/photo-1590146758302-f1899478ce77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80);
    background-size: cover;
  }
}
// card
@media (max-width: 776px){
  .card {
    img {
      height: auto !important;
    }
    .card-footer {
      font-size: 24px;
    }
  }
}

// 客製化
.custom {
  .customimg {
    background-image: url(https://images.unsplash.com/photo-1571195555904-f0fe9968ee5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80);
    background-size: cover;
    background-position: bottom;
    height: 400px;
  }
}
// 訂閱
.subscribe {
  background-color: #b3d3f5;
}

</style>
