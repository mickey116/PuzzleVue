import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views//Login/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/Layout/About/About.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Layout/Cart/Cart.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/Layout/Checkout/Checkout.vue'),
      },
      {
        path: 'checkoutdone',
        name: 'Checkoutdone',
        component: () => import('../views/Layout/Checkout/Checkoutdone.vue'),
      },
      {
        path: 'goodsdetail/:id',
        name: 'Goodsdetail',
        component: () => import('../views/Layout/Goods/Goodsdetail.vue'),
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('../views/Layout/Goods/Goods.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Dashboard/Products/Products.vue'),
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/Dashboard/Coupon/Coupon.vue'),
      },
      {
        path: 'orderlist',
        name: 'Orderlist',
        component: () => import('../views/Dashboard/Orderlist/Orderlist.vue'),
      },
      {
        path: 'imagelist',
        name: 'Imagelist',
        component: () => import('../views/Dashboard/Imagelist/Imagelist.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
