<template>
  <div id="home">
    <!-- banner -->
    <div class="Homebanner mb-4  mt-2 mt-lg-0 "
    :style="{backgroundImage: `url(${img.banner})`}">
      <div class="bannerTitle h3">
        <p>
          買一幅拼圖，<br>
          盡情享受自己的時光吧！<br>
        </p>
        <router-link to="/goods" class="btn btn-primary btn-lg">
        購物去
        </router-link>
      </div>
      <div class="arrowDown text-white">
        <i class="fas fa-angle-double-down"></i>
      </div>
    </div>

    <!-- new -->
    <div class="new container">
      <div class="hometitle">
        <h2>新品上市</h2>
        <div class="line"></div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="newWrap">
            <router-link
            to="/goodsdetail/758fuFDD5AZfXH2Q71Akg383pINBOasBwNRNOhslyfEQDwo6Gsj7Xsz58wP3JzUq">
              <div class="newImg" :style="{backgroundImage: `url(${img.new1})`}"></div>
            </router-link>
          </div>
          <div class="newTxt">
            <div class="newInner">
              <h4>旅行系列</h4>
              <p>多久沒來場說走就走的旅行呢？有了旅行系列拼圖隨時帶你到世界各國。</p>
              <router-link to="/goods" class="btn btn-primary">
                看更多
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="newWrap">
            <router-link
            to="/goodsdetail/PceBLlHSwbFYuL38b4ONqDAXyMPAkbLe1PgX098b6k1tHReGwr1lRIbwT3QZrNix">
              <div class="newImg" :style="{backgroundImage: `url(${img.new2})`}"></div>
            </router-link>
          </div>
          <div class="newTxt">
            <div class="newInner">
              <h4>花卉系列</h4>
              <p>每種花都有不同的花語，何不妨買下賦予意義的花朵系列呢？</p>
              <router-link to="/goods" class="btn btn-primary">
                看更多
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="newWrap">
            <router-link
            to="/goodsdetail/9GYQIcxFCjpnIAbSFdJKScyvs2wjZvVlTcBAJKrjI32BH744gDBr1x1Vz1iJuOWN">
              <div class="newImg" :style="{backgroundImage: `url(${img.new3})`}"></div>
            </router-link>
          </div>
          <div class="newTxt">
            <div class="newInner">
              <h4>動物系列</h4>
              <p>當你心靈感到孤單時，不妨看看動物系列這些可愛的小動物們吧！</p>
              <router-link to="/goods" class="btn btn-primary">
                看更多
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- custom -->
    <div class="custom">
      <div class="row no-gutters">
        <div class="col-md">
          <div class="customImg" :style="{backgroundImage: `url(${img.custom1})`}">
          </div>
        </div>
        <div class="col-md cusContent">
          <div class="cusWrap">
            <h4 class="text-center">客製化系列</h4>
            <div class="cusTxt text-center">
              <p>沒有看到喜歡的拼圖嗎？
                <br>不妨自己製作一個吧。
              </p>
              <router-link
              to="/goodsdetail/eqe21AUsyIOMd6nwBM2kdgIybYtjA2h1HuTgI8s53WjBLq9teMYigbH0jEopK4NE"
              class="btn btn-primary">
              購買
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="customImg" :style="{backgroundImage: `url(${img.custom1})`}">
          </div>
        </div>
      </div>
    </div>

    <!-- hotsale -->
    <div class="hot container">
      <div class="hometitle">
        <h2>本週熱銷</h2>
        <div class="line"></div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <router-link
          to="/goodsdetail/KAK2gFIszNgvNNjKQJCF7jIMytVBvqRsmNlFiRziy7c3bsBxTo1VSjuQQt5LBAOh">
            <div class="hotWrap" :style="{backgroundImage: `url(${img.hot1})` }">
              <div class="hotDetail">
                <h4>自然系列-山尖</h4>
                <p>
                  長越大，
                  <br />是不是越覺得孤單，
                  <br />當你孤單時，
                  <br />自然系列的美景，
                  <br />一定能療癒你。
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-6">
          <router-link
          to="/goodsdetail/j01p3s8OdN8egXVMlb78D0hIpYu7zLguZ10DuLR5wHap6EpLzizUPBCxHggNWhWj">
            <div class="hotWrap" :style="{backgroundImage: `url(${img.hot2})` }">
              <div class="hotDetail">
                <h4>動物系列-雪狐</h4>
                <p>
                  看著這些，
                  <br />可愛的小動物，
                  <br />一切的煩惱是不是，
                  <br />全都消失了呢。
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

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
                <button class="btn btn-primary rounded-0" type="button"
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
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/z4xo7sB2yS9LrYCOHdFrMvJxpWOPLrchPjjqAIXOGOWhAbEw47USRilskKNpMrbL0AYbAYv3PHCXNLYaeya95nnYNnbddv9dqsSesw6WMFErAofMROyNUNUfyqnzX1j1.jpeg',
        new1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Wrq3XcTAtHryJ1ekAoq3Idy2garkC2OXzN8QAb1iy73aOXwKMwTU7On8b4ijD2DzBF3Gob8ASXOZkyLutmUncmCiyHuDXYSbTTt1RY26LUUxSPzxlr0UxqgBNKeMOvWd.jpeg',
        new2:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/YsZ9UWGhvoFUQAS9LUEguLkXQ641TCFu2MpzXTACM75M6kvPNTuCr3LfoM6xuPIMHLCijKPmcBXFzopqiSzfLnEjOmc8HjlXtw4fee96NkjVDojl1j3KLa5FbnLSuNk6.jpeg',
        new3:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/8plsGEyfLgLPvDi1MfvS4AhD3CMNkAdp35SuDkkuuYVg4gnuWUKoRp3qhv3cP0CuwOkAgj58dUSYBbrNatTT93uJDbiFpY0Hk11uzTHPfgYEubxsuLodeGYZSIlZqjI6.jpeg',
        hot1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/7o0tPLtnWtyJrxX6hBW2xa3j0lpkY1LWSSjXQ9SLv1CTDF49NtkPRgDNI0nXZnTj8TSFpxci3VdIsWV2WruNV1SYgAuSYXjm5XOxRKz9lNzOzh0zxkyrrhzGrbBdG5ji.jpeg',
        hot2:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/VSsnuNAxO3kFTlHSBRMsK9YQnCcvU30Riwq1dtbM6AjoPgUS6augTGkD6nwNbNz2tKBjeL7quOHhCmWHvp7JRzP7Axnye1a9OTPmyUpKDdUGFkOx1y0U5VMEGpqwFlsF.jpeg',
        custom1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/cE06EWxIhV7zivXsKnxO7hFJ0QrnlTFcp0gEWB4l9Iq4WYt2dFDwCTe61HGNNhzxxdRTc40NfPeEbQYjOm9nBhosNNit90aKRuWpAeF67lgwsLkGqpMSQLMBVQDzkM6M.jpeg',
        custom2:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/yUiRELFt6MCPHv1QKhrHujX4s71cB4CFSLanYYSedqCMxB4Lu3yMDQHwb15skW4NgZPOcw7NJIGMLdpI7hW5jjX2VQObqkd563mFf4ljsHaylYOOjbVruF0bZlW8BbUa.jpeg',
      },
    };
  },
  methods: {
  },
};
</script>
