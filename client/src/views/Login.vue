<template>
    <div>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return{
                email: null,
                password: null,
            }
        },
        methods: {
            login(){
                let loginInput = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch("doLogin", loginInput)
                .then(result=>{
                    console.log('aaaaaaa');
                    this.$router.push('/inventory');
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>