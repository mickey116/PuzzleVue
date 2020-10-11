<template>
  <div id="layout">
    <Navbar></Navbar>
    <router-view></router-view>
    <footer class="py-3 sticky-bottom">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="copyright">© 2020 Puzzle All Rights Reserved.</div>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <a href="https://zh-tw.facebook.com/" target="_blank">
              <i class="fab fa-facebook-square fa-2x text-white"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.instagram.com/accounts/login/?hl=zh-tw" target="_blank">
              <i class="fab fa-instagram fa-2x text-white"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://line.me/R/ti/p/%40linehelptw" target="_blank">
              <i class="fab fa-line fa-2x text-white"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.google.com/?hl=zh_tw" target="_blank">
              <i class="fab fa-google-plus-square fa-2x text-white"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Layout',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
footer {
  background-color:  #00346D;
  color: #FFF;
}
.contacticon {
  color: white;
}
</style>
