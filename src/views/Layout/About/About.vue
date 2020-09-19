<template>
  <div class="container" id="about">
    <div class="jumbotron jumbotron-fluid mt-3">
    </div>
    <div class="row my-5">
      <div class="col-md mb-4">
        <h3 class="text-center">品牌理念</h3>
        <p class="mt-3 h5 text-center">
          在這個充滿各種壓力的現代社會，<br>
          很多人找不到讓自己放輕鬆的方法。<br>
          其實，拼拼圖，是一個很好的紓壓方式。<br>
          拼圖時，你會專注在拼圖上，<br>
          暫時忘記一切煩惱、壓力。<br>
          有個暫時喘息的空間。<br>
          因此，本店每個月將會挑選多幅療癒拼圖，<br>
          供各位需要療癒的拼友們購買。<br>
        </p>

      </div>
      <div class="col-md">
        <div class="w-100 thanks">
        </div>
        <div class="div text-center">
          <router-link to="/goods" class="btn btn-primary mt-5">立即購物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#about {
  font-family: 'Noto Serif JP', serif;

}
// jumbotron
.jumbotron {
  background-image: url(https://images.unsplash.com/photo-1590146757941-486a0c8385ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  min-height: 350px;
}
.thanks {
  background-image: url(https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80);
  background-position: center center;
  min-height: 200px;
  border-radius: 50px;
}
p {
  line-height: 30px !important;
}

</style>
