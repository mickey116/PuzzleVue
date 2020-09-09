<template>
  <div id="home">
    <!-- jumbo -->
    <div class="jumbotron jumbotron-fluid jumbotron-bg">
      <div class="container jumbotext">
        <!-- <div class="bg-lighter p-3">
          <p class="lead m-0">
            <strong>
              想讓自己暫時遠離紛亂的世界嗎？
              <br />不要猶豫
              買我就對了！
            </strong>
          </p>
          <button class="btn btn-info mt-2">開始購物</button>
        </div>-->
      </div>
    </div>
    <!-- productlist -->
    <section class="container">
      <div class="div">
        <router-link to="/about">品牌理念</router-link>
        <router-link to="/about">產品列表</router-link>
        <router-link to="/about">聯絡我們</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
#home {
  padding-top: 79px;
}
.jumbotron-bg {
  background-image: url(https://images.unsplash.com/photo-1586527155314-1d25428324ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
  /* background-size:cover; */
  background-position: center center;
  min-height: 400px;
}
.jumbotext {
  position: relative;
}
.bg-lighter {
  background-color: rgba(255, 255, 255, 0.45);
  position: absolute;
  top: 170px;
  left: 200px;
}
@media (max-width: 576px) {
  .jumbotron {
    display: none;
  }
}
</style>
