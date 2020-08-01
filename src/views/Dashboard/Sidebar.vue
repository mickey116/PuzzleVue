<template>
  <div>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-4">
        <ul class="nav flex-column mb-3 h6">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">
            產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link">
            優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orderlist" class="nav-link">
            訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/imagelist" class="nav-link">
            圖片儲存列表
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
