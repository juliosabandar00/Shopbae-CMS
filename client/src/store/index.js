import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const url = 'http://localhost:5000';
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoia2p1bGlvc2FiYW5kYXJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4Njk0MjI2OH0.hyVrnkvH4N32iUGTiQxpbdXfqzkQCapl3zIoaq0hnJo';
export default new Vuex.Store({
  state: {
    products: [],
    isLoggedIn: false,
    productToUpdate: null
  },
  mutations: {
    SET_PRODUCTS(state, payload){
      state.products = payload;
    },
    SET_ISLOGGEDIN(state, payload){
      state.isLoggedIn = payload;
      console.log(state.isLoggedIn);
    },
    SET_PRODUCTTOUPDATE(state, payload){
      state.productToUpdate = payload;
      console.log('updating this:')
      console.log(payload)
    }
  },
  actions: {
    checkLogin({ commit }){
      console.log('checkinnnggggg')
      if(localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') && 'undefined'){
        commit('SET_ISLOGGEDIN', true)
        this.dispatch('getProducts');
      }
    },
    getProducts({ commit }){
      axios({
        url: url + '/product',
        method: 'get',
        headers:{
            access_token : access_token
        }
      })
      .then(response=>{
        commit('SET_PRODUCTS', response.data.products)
      })
      .catch(console.log)
    },
    addProduct({ commit }, payload){
      console.log('massukkkkk')
      return axios({
        url: url + '/product',
        method: 'post',
        data: {
            name: payload.name,
            image_url: payload.image_url,
            price: Number(payload.price),
            stock: Number(payload.stock),
        },
        headers:{
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        console.log(response)
      })
    },
    deleteProduct({commit}, payload){
      console.log('deletingggg')
      console.log(payload)
      return axios({
        url: url + '/product/' + payload,
        method: 'delete',
        headers:{
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },

    updateProduct({commit}, payload){
      console.log('updatinggg');
      console.log(payload);
      return axios({
        url: url + '/product/' + payload.id,
        method: 'put',
        data:{
          name: payload.name,
          image_url: payload.image_url,
          price: Number(payload.price),
          stock: Number(payload.stock),
        },
        headers:{
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })

    },
    doLogin({ commit }, payload){
        return axios({
          url: url + '/login',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
        .then(response=>{
          console.log('logged in')
          commit('SET_ISLOGGEDIN', true);
          localStorage.setItem('access_token', response.data.access_token);
        })
        .catch(err =>{
          console.log(err);
        })
    }
  },
  modules: {
  },
});
