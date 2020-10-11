<template>
  <div class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <Navbar></Navbar>
    <AlertMessage/>
    <!-- LOgin -->
    <div class="row mt-5">
      <div class="col form-signin">
        <nav>
          <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link"
              id="nav-register-tab"
              data-toggle="tab"
              href="#nav-register"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >註冊</a>
            <a
              class="nav-item nav-link active"
              id="nav-login-tab"
              data-toggle="tab"
              href="#nav-login"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >登入</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade "
            id="nav-register"
            role="tabpanel"
            aria-labelledby="nav-register-tab"
          >
            <div class="form-row social-connect">
              <div class="col-12 col-lg mb-3 mb-md-0">
                <button
                  class="btn-block p-2 btn btn-line d-flex
                  align-items-center justify-content-center"
                >
                  <i class="fab fa-line mr-2"></i>
                  使用 LINE 註冊
                </button>
              </div>
              <div class="col-12 col-lg mb-3 mb-md-0">
                <button
                  class="btn-block p-2 btn btn-facebook d-flex
                  align-items-center justify-content-center"
                >
                  <i class="fab fa-facebook-square mr-2"></i>
                  <span>使用 Facebook 註冊</span>
                </button>
              </div>
            </div>
            <hr />
            <h6 class="text-center m-4">用戶註冊</h6>
            <form>
              <div class="form-group">
                <label for="inputrUser" class="sr-only">username</label>
                <div class="username-container">
                  <i class="fas fa-user"></i>
                  <input
                    id="inputrUser"
                    v-model="user.password"
                    type="text"
                    class="form-control"
                    placeholder="用戶名"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputrEmail" class="sr-only">Email address</label>
                <div class="email-container">
                  <i class="far fa-envelope"></i>
                  <input
                    id="inputrEmail"
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    placeholder="電子信箱"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputrPassword" class="sr-only">Password</label>
                <div class="password-container">
                  <i class="fas fa-unlock-alt"></i>
                  <input
                    id="inputrPassword"
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    placeholder="密碼"
                    required
                  />
                </div>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" /> 訂閱商電最新資訊及優惠方案
                </label>
              </div>
              <button class="btn btn-primary btn-block mt-3"
              type="button" data-toggle="modal" data-target="#exampleModalCenter">註冊</button>
            </form>
          </div>
          <div
            class="tab-pane fade show active"
            id="nav-login"
            role="tabpanel"
            aria-labelledby="nav-login-tab"
          >
            <div class="form-row social-connect">
              <div class="col-12 col-lg mb-3">
                <button
                  class="btn-block p-2 btn btn-line
                  d-flex align-items-center justify-content-center"
                >
                  <i class="fab fa-line mr-2"></i>
                  使用 LINE 登入
                </button>
              </div>
              <div class="col-12 col-lg mb-3">
                <button
                  class="btn-block p-2 btn btn-facebook
                  d-flex align-items-center justify-content-center"
                >
                  <i class="fab fa-facebook-square mr-2"></i>
                  <span>使用 Facebook 登入</span>
                </button>
              </div>
            </div>
            <hr />
            <h6 class="text-center m-4">用戶登入</h6>
            <form @submit.prevent="signin">
              <div class="form-group">
                <label for="inputEmail" class="sr-only">Email address</label>
                <div class="email-container">
                  <i class="far fa-envelope"></i>
                  <input
                    id="inputEmail"
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    placeholder="請輸入您的電子信箱"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="sr-only">Password</label>
                <div class="password-container">
                  <i class="fas fa-unlock-alt"></i>
                  <input
                    id="inputPassword"
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    placeholder="請輸入您的密碼"
                    required
                  />
                </div>
              </div>
              <a href="#" class="text-secondary d-block text-right">忘記密碼？</a>
              <button class="btn btn-primary btn-block mt-3 btnlogin" type="submit">登入</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">註冊成功</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">您可以開始購物了！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  components: {
    Navbar,
    AlertMessage,
  },
  methods: {
    toHome() {
      const vm = this;
      vm.$router.push('/home');
    },
    register() {
      this.$router.push('/goods');
    },
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      vm.isLoading = true;
      vm.$http
        .post(api, vm.user)
        .then((res) => {
          vm.isLoading = false;
          const { token } = res.data;
          const { expired } = res.data;
          // 寫入 cookie token
          // expires 設置有效時間 unix時間轉換
          document.cookie = `hasToken=${token};expires=${new Date(expired * 1000)}; path=/`;
          vm.$router.push('/admin/products');
          vm.$bus.$emit('message:push',
            '登入成功', 'success');
        })
        .catch(() => {
          vm.isLoading = false;
          vm.$bus.$emit('message:push',
            '登入失敗', 'danger');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// navs
.tab-content {
  border: 1px solid #c5cae9;
  border-top: none;
  padding: 1rem;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.nav-tabs .nav-link {
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid #c5cae9;
  color: #495057;
  background-color: #c5cae9;
}
.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #c5cae9;
  border-bottom: none;
}
// main
.form-signin {
  // width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 0 auto;
}

// socailconnect
.social-connect i {
  font-size: 1.5rem;
}
// username-container
.username-container {
  position: relative;
  input {
    text-indent: 1.8rem;
  }
  i {
    position: absolute;
    color: #6c757d;
    top: 11px;
    left: 16px;
  }
}

// email-container
.email-container {
  position: relative;
}
.email-container input {
  text-indent: 1.8rem;
}
.email-container i {
  position: absolute;
  color: #6c757d;
  top: 11px;
  left: 16px;
}

// password-container
.password-container {
  position: relative;
}
.password-container input {
  text-indent: 1.8rem;
}
.password-container i {
  position: absolute;
  color: #6c757d;
  top: 10px;
  left: 16px;
}

</style>
