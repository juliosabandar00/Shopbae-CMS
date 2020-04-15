<template>
  <div id="app">
      <Navbar> </Navbar>
      <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  export default {
    name: 'App',
    components: {
      Navbar
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      }
    },
    created(){
      this.checkLogin();
    },
    methods: {
      checkLogin: function(){
        if(localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') && 'undefined'){
          this.$store.commit('SET_ISLOGGEDIN', true);
          this.$router.push('/inventory');
        }
        else{
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
