<template>
  <div class="bg-white position-relative fixed-top" id="navbar">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white custom-navbar">
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand mr-0">
        PUZZLE</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
              <router-link to="/goods" class="nav-link">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/getcoupon" class="nav-link">專屬優惠</router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex user">
          <router-link to="/favorite" class="nav-link">
            <i class="fas fa-heart"></i>
          </router-link>
          <div class="dropdown ml-auto cart">
            <button class="btn btn-md position-relative nav-link"
            data-toggle="dropdown" data-flip="false">
              <i class="fas fa-shopping-cart" aria-hidden="true"></i>
              <span class="badge badge-pill badge-danger "
              v-if="cart.length">{{ cart.length }}</span>
            </button>
            <!-- dropdown內容 -->
            <div class="dropdown-menu dropdown-menu-right"
            >
              <div class="p-2" v-if="cart.length">
                <h6 class="text-center">已選擇商品</h6>
                <table class="table text-center table-sm">
                  <tbody>
                    <tr v-for="item in cart" :key="item.product.id">
                      <td class="align-middle" width="30">
                        <a href="#" class="text-secondary trash"
                        @click.prevent="removeCartItem(item.product.id)">
                          <i class="far fa-trash-alt " aria-hidden="true"></i>
                        </a>
                      </td>
                      <td class="align-middle">{{ item.product.title }}</td>
                      <td class="align-middle" width="80">
                        {{ item.quantity }} {{ item.product.unit }}
                      </td>
                      <td class="align-middle text-right">${{ item.product.price }}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link to="/cart" class="btn btn-primary btn-block text-white">
                  <i class="fas fa-cart-arrow-down"></i>
                  結帳去
                </router-link>
              </div>
              <div class="p-2" v-else>
                <h6 class="text-center mb-3">購物車沒有商品喔！</h6>
                <div class="text-center">
                  <router-link to="/goods" class="btn btn-primary text-white ">
                  選購去
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      cart: {},
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      vm.isLoading = true;
      vm.$http.delete(api).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
    this.$bus.$on('getcart', () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss">
#navbar {
  box-shadow:0 1px 5px 1px rgba(0,0,0, 0.1);
  margin-bottom: 20px;
}
.custom-navbar {
  .navbar-brand {
    font-family: 'Permanent Marker', cursive;
  }
  #navbarNav {
    z-index: 99;
    .nav-link {
      color: #02417E;
      padding: 0.5rem;
      margin-left:1rem;
      font-size: 16px;

      &:hover {
        color: #00346D;
      }
    }
  }
    .user {
      a {
        color:  #00346D;;
      }
      button {
        outline: none;
        &:focus {
          box-shadow: none;
        }
        i {
          color:  #00346D;
        }
        span {
          position: absolute;
          top:2px;
          right:3px;
        }
      }
      .dropdown-menu {
        border: 2px solid #02417E;
        .trash {
          &:hover {
            color:red !important;
          }
        }
      }
    }
}

@media (max-width: 991px) {
  .custom-navbar{
    .container {
    padding: 0px;
    }
    padding-bottom: 0px;
    .navbar-toggler {
      border: transparent;
      outline: none;
    }
    .navbar-brand {
      padding-top: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
    }
    #navbarNav {
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      background-color: #FFF;
      .navbar-nav {
        margin-top: 0.5rem;
        border-top: 2px solid #e8eaf6;
        li {
          border-bottom: 2px solid #e8eaf6;
          text-align: center;
          &:hover {
            background-color: #e8eaf6;
          }
        }
      }
    }
    .user {
      position: absolute;
      top:6px;
      right:0;
    }
    .cart {
      button {
        i {
          position: absolute;
          top:60%;
        }
      }
      .dropdown-menu {
        min-width: 360px;
      }
    }
  }
}
@media (min-width: 991px) {
  .cart {
    button {
        i {
          position: absolute;
          top:70%;
        }
      }
    .dropdown-menu {
      width: 400px;
    }
  }
}

</style>
