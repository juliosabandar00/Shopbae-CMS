<template>
    <div>
        <h1> Inventory </h1>
        <hr>
        <router-link :to="{ name: 'AddProduct' }" >
            <button type="button" class="btn btn-primary">Add Product</button>
        </router-link>
        <router-view/>
        <hr>
        <div v-if="products.length >= 1" id="product_table">
            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody v-for="product in products">
                    <tr>
                        <td>{{product.id}}</td>
                        <td>
                            {{product.name}} 
                        </td>
                        <td> <img :src="product.image_url" alt="" border=3 height=100> </td>
                        <td>{{product.price}}</td>
                        <td>{{product.stock}}</td>
                        <td>
                            <button v-on:click.prevent="setProductToUpdate(product)" type="button" class="btn btn-success">Update</button>
                            <button v-on:click.prevent="deleteProduct(product.id)" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h1> You Have No Products </h1>
        </div>
    </div>
</template>

<script>
    import AddProduct from '../components/AddProduct.vue';
    import EditProduct from '../components/UpdateProduct.vue'
    export default {
        name: 'Inventory',
        components: {
            AddProduct,
            EditProduct
        },
        data(){
            return {};
        },
        computed: {
            products(){
                return this.$store.state.products;
            }
        },
        created(){
            this.loadInventory();
        },
        methods: {
            loadInventory: function(){
                this.$store.dispatch('getProducts');
            },
            deleteProduct: function(id){
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this product!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if(willDelete) {
                        return this.$store.dispatch('deleteProduct', id)
                    }
                    else {
                        swal("Your product is safe!");
                    }
                })
                .then(response=>{
                    console.log(response);
                    this.$store.dispatch('checkLogin')
                    this.$router.push('/inventory');
                })
                .catch(console.log)
            },
            setProductToUpdate: function(product){
                this.$store.commit('SET_PRODUCTTOUPDATE', product);
                this.$router.push('/inventory/update/' + product.id)
            }
        }
    }
</script>
<style scoped>
.btn{
    margin-left: 10px;
    margin-right: 10px;

}
</style>