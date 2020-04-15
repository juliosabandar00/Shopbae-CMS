<template>
    <div>
        <h1> Update Product </h1>
        <form @submit.prevent="updateProduct">
            <div class="form-group">
                <label for="Name">Name</label>
                <input v-model="inputName" type="text" class="form-control" id="Name">
            </div>
            <div class="form-group">
                <label for="Price">Price</label>
                <input v-model="inputPrice"   type="text" class="form-control" id="Price">
            </div>
            <div class="form-group">
                <label for="Stock">Stock</label>
                <input v-model="inputStock"  type="text" class="form-control" id="Stock">
            </div>
            <div class="form-group">
                <label for="Stock">Image URL</label>
                <input v-model="inputImageURL" type="text" class="form-control" id="Image URL">
            </div>
            <button type="submit" class="btn btn-success">Update Product</button>
            <router-link :to="{ name: 'Inventory' }" >
                <button type="button" class="btn btn-danger">Cancel</button>
            </router-link>
        </form>
    </div>
</template>

<script>
    const url = 'http://localhost:5000';
    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoia2p1bGlvc2FiYW5kYXJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4Njk0MjI2OH0.hyVrnkvH4N32iUGTiQxpbdXfqzkQCapl3zIoaq0hnJo';
    export default {
        name: 'UpdateProduct',
        data(){
            return{
                inputName: null,
                inputPrice: null,
                inputStock: null,
                inputImageURL: null
            }
        },
        computed: {
            productToUpdate(){
                return this.$store.state.productToUpdate;
            }
        },
        mounted: function () {
            if(this.productToUpdate){
                this.inputName = this.productToUpdate.name;
                this.inputPrice = this.productToUpdate.price;
                this.inputStock = this.productToUpdate.stock;
                this.inputImageURL = this.productToUpdate.image_url;
            }
        },
        methods: {
            updateProduct: function(){
                let productData = {
                    id: this.productToUpdate.id,
                    name: this.inputName,
                    image_url: this.inputImageURL,
                    price:  this.inputPrice,
                    stock: this.inputStock
                }
                this.$store.dispatch('updateProduct', productData)
                .then(response=>{
                    console.log(response);
                    this.inputName = null;
                    this.inputImageURL = null;
                    this.inputPrice = null;
                    this.inputStock = null;
                    this.$store.dispatch('checkLogin')
                    this.$router.push('/inventory');
                })
            }
        }
    }
</script>

<style scoped>

</style>