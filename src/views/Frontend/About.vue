<template>
  <div class="container" id="about">
    <!-- banner -->
    <div class="aboutbannerbox">
      <div class="aboutbanner mb-4  mt-3 mt-lg-0" :style="{backgroundImage: `url(${img.banner})` }">
      </div>
      <h2 class="mb-0">關於我們</h2>
    </div>
    <!-- main -->
    <div class="row no-gutters aboutbox">
      <div class="col-md mb-0 abouttxt">
        <div class="aboutinner">
          <h3 class="text-center mt-4">品牌理念</h3>
          <p class="mt-4 h5 text-center mb-0">
            在這個充滿各種壓力的現代社會，<br>
            很多人找不到讓自己放輕鬆的方法。<br>
            其實，拼拼圖，是一個很好的紓壓方式。<br>
            拼圖時，你會專注在拼圖上，<br>
            暫時忘記一切煩惱、壓力。<br>
            有個暫時喘息的空間。<br>
            因此，本店每個月將會挑選多幅療癒拼圖，<br>
            供各位需要療癒的拼友們購買。<br>
          </p>
          <div class="div text-center">
          <router-link to="/goods" class="btn btn-primary my-4 btn-lg">立即購物</router-link>
        </div>
        </div>
      </div>
      <div class="col-md aboutimg" :style="{backgroundImage: `url(${img.bg1})` }">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/JmgReiZHDg7yjqzHTiUaZFBtOVdJVI4Zlpaeiygc1pwPwwxW6udpRZMMZIUczHFAJramsTDIuwnWgIgboFgL31wgkqpB2D6YmQqznxaKDU1vF95zSTZlR5peeKiKXGvo.jpeg',
        bg1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/6sRzkKTjG9yNMjstOCNfPj6eAva3YtCNqysk10Fg4sbondTo0aRLdu9ks3bNLqamZTX4TqBR3qfNl79yOCV0kirpLibK3hfkVzSNg6qLnFEyZzIvn6I4k2927MtcyrpW.jpeg',
      },
    };
  },
};
</script>
