<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="title" >
            <h2 class="app_name"> Shopbae CMS </h2>
        </div>
        <div class="signout">
            <button v-if="isLoggedIn" type="button" v-on:click.stop="signOut" class="btn btn-danger">Sign Out</button>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'Navbar',
        computed: {
            isLoggedIn(){
                return this.$store.state.isLoggedIn;
            }
        },
        methods: {
            signOut: function(){
                localStorage.clear();
                this.$store.commit('SET_ISLOGGEDIN', false);
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    h2 {
        color: white;
    }
</style>