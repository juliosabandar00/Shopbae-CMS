import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import Inventory from '../views/Inventory.vue';
import AddProduct from '../components/AddProduct.vue'
import UpdateProduct from '../components/UpdateProduct.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component:  About
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
    children: [
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct,    
      },
      {
        path: 'update/:id',
        name: 'UpdateProduct',
        component: UpdateProduct,    
      }

    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
