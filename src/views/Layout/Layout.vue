<template>
  <div id="layout">
    <Navbar></Navbar>
    <router-view></router-view>
    <footer class="py-2 sticky-bottom">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="copyright">© 2020 Puzzle All Rights Reserved.</div>
        <div class="list-inline contacticon">
          <a class="list-inline-item contacticon" href="#">
            <i class="fab fa-facebook-square fa-2x"></i>
          </a>
          <a class="list-inline-item contacticon" href="#">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a class="list-inline-item contacticon" href="#">
            <i class="fab fa-line fa-2x"></i>
          </a>
          <a class="list-inline-item contacticon" href="#">
            <i class="fab fa-google-plus-square fa-2x"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Layout',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
  methods: {
  },
  created() {

  },
};
</script>

<style lang="scss">
.user {
  color: black !important;
  font-size: 18px;
}

footer {
  background-color:  #00346D;//#8aacc8;
  color: #FFF;
}

.contacticon {
  color: #FFF !important;
}
</style>
