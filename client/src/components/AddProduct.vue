<template>
    <div>
        <form @submit.prevent="createProduct">
            <div class="form-group">
                <label for="Name">Name</label>
                <input v-model="inputName" type="text" class="form-control" id="Name">
            </div>
            <div class="form-group">
                <label for="Price">Price</label>
                <input v-model="inputPrice" type="text" class="form-control" id="Price">
            </div>
            <div class="form-group">
                <label for="Stock">Stock</label>
                <input v-model="inputStock" type="text" class="form-control" id="Stock">
            </div>
            <div class="form-group">
                <label for="Stock">Image URL</label>
                <input v-model="inputImageURL" type="text" class="form-control" id="Image URL">
            </div>
            <button type="submit" class="btn btn-success">Add Product</button>
            <router-link :to="{ name: 'Inventory' }" >
                <button type="button" class="btn btn-danger">Cancel</button>
            </router-link>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'AddProduct',
        data(){
            return{
                inputName: null,
                inputImageURL: null,
                inputPrice: null,
                inputStock: null,
            }
        },
        methods: {
            createProduct: function(){
                let productData = {
                    name: this.inputName,
                    image_url: this.inputImageURL,
                    price: this.inputPrice,
                    stock: this.inputStock
                }
                this.$store.dispatch('addProduct', productData)
                .then(response=>{
                    console.log(response);
                    this.inputName = null;
                    this.inputImageURL = null;
                    this.inputPrice = null;
                    this.inputStock = null;
                    this.$store.dispatch('checkLogin')
                    this.$router.push('/inventory');
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>