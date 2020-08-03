<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand mb-0 h1">Puzzle</router-link>
      <!-- <a class="navbar-brand mb-0 h1" href="#">Puzzle</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav h4 ml-auto">
          <li class="nav-item">
            <router-link to="/goods" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">管理者登入</router-link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-light{
  background-color: transparent !important;
}
.nav-link{
  color: tomato !important;
}

</style>
