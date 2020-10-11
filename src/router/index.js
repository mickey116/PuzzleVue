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
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '',
    component: () => import('@/views/Frontend/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Frontend/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Frontend/About.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/Frontend/Cart.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/Frontend/Checkout/Checkout.vue'),
      },
      {
        path: 'checkoutdone/:orderId',
        name: 'Checkoutdone',
        component: () => import('@/views/Frontend/Checkout/Checkoutdone.vue'),
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/Frontend/Goods/Goods.vue'),
      },
      {
        path: 'goodsdetail/:id',
        name: 'Goodsdetail',
        component: () => import('@/views/Frontend/Goods/Goodsdetail.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/views/Backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/Backend/Products.vue'),
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/Backend/Coupon.vue'),
      },
      {
        path: 'orderlist',
        name: 'Orderlist',
        component: () => import('@/views/Backend/Orderlist.vue'),
      },
      {
        path: 'imagelist',
        name: 'Imagelist',
        component: () => import('@/views/Backend/Imagelist.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
