const request = require('supertest');
const app = require('../app')
const jwt = require('jsonwebtoken');
const created_product = {
    name: 'N95 Mask',
    image_url: 'https://www.envirosafetyproducts.com/media/product/160/3mtm-8511-n95-particulate-respirator-box-of-10-b2f.jpg',
    price: 100000,
    stock: 100
}
const updated_product = {
    name: 'N95 Mask',
    image_url: 'https://www.envirosafetyproducts.com/media/product/160/3mtm-8511-n95-particulate-respirator-box-of-10-b2f.jpg',
    price: 90000,
    stock: 200
}
const invalid_product = {
    name: null,
    image_url: null,
    price: null,
    stock: null
}
const negative_product = {
    name: 'N95 Mask',
    image_url: 'https://www.envirosafetyproducts.com/media/product/160/3mtm-8511-n95-particulate-respirator-box-of-10-b2f.jpg',
    price: -10,
    stock: -10
}
const validUser = {
    email: 'admin@gmail.com',
    password: 'password'
}
let access_token = null;
let invalid_access_token = null;
let non_admin_access_token = null;

let id = null;
let invalidId = 10000000;
beforeAll(() => {
    non_admin_access_token = jwt.sign({
        userId: 1,
        email: 'admin@gmail.com',
        username: 'Admin',
        role: 'Customer'
    }, process.env.JWT_SECRETKEY);
    return request(app)
        .post('/login')
        .send(validUser)
        .then( response => {
            access_token = response.body.access_token;
        });
});

describe('Product routes testing', () => {
    describe('GET /product', ()=> {
        test('Show Product Success', function(done){
            return request(app)
            .get('/product')
            .set('access_token', access_token)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty('products');
                expect(Array.isArray(body.products)).toBe(true);
                done();
            });
        });
    }); 
    describe('POST /product', ()=>{
        test('Add Product Success', function(done){
            return request(app)
            .post('/product')
            .set('access_token', access_token)
            .send(created_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(201);
                id = body.product.id;
                expect(body.product).toHaveProperty('id')
                expect(body.product).toHaveProperty('name', created_product.name);
                expect(body.product).toHaveProperty('image_url', created_product.image_url);
                expect(body.product).toHaveProperty('price', created_product.price);
                expect(body.product).toHaveProperty('stock', created_product.stock);
                done();
            });
        });
        test('Add Product Failure(Validation Error)', function(done){
            return request(app)
            .post('/product')
            .set('access_token', access_token)
            .send(invalid_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty('message', 'Invalid Input');
                done();
            });
        });
        test('Add Product Failure (Negative Integer Input)', function(done){
            return request(app)
            .post('/product')
            .set('access_token', access_token)
            .send(negative_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty('message', 'Invalid Input');
                done();
            });
        });
        test('Add Product Failure (Non Admin User)', function(done){
            return request(app)
            .post('/product')
            .set('access_token', non_admin_access_token)
            .send(created_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty('message', 'Access Forbidden');
                done();
            });
        });
        test('Add Product Failure (No Access Token)', function(done){
            return request(app)
            .post('/product')
            .set('access_token', invalid_access_token)
            .send(created_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message', 'token not not found');
                done();
            });
        });
    });
    describe('PUT /product/:id', ()=> {
        test('Update Product Success', function(done){
            return request(app)
            .put('/product/' + id)
            .set('access_token', access_token)
            .send(updated_product)
            .then(response=>{
                console.log(response);
                const {body,status} = response;
                expect(status).toBe(200);
                console.log(body);
                expect(body.product).toHaveProperty('id')
                expect(body.product).toHaveProperty('name', updated_product.name);
                expect(body.product).toHaveProperty('image_url', updated_product.image_url);
                expect(body.product).toHaveProperty('price', updated_product.price);
                expect(body.product).toHaveProperty('stock', updated_product.stock);
                done();
            })
        });
        test('Update Product Failure (Validation Error)', function(done){
            return request(app)
            .put('/product/' + id)
            .set('access_token', access_token)
            .send(invalid_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty('message', 'Invalid Input');
                done();
            });
        });
        test('Update Product Failure (Negative Integer Input)', function(done){
            return request(app)
            .put('/product/' + id)
            .set('access_token', access_token)
            .send(negative_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty('message', 'Invalid Input');
                done();
            });
        });
        test('Update Product Failure (Non Admin User)', function(done){
            return request(app)
            .put('/product/' + id)
            .set('access_token', non_admin_access_token)
            .send(updated_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty('message', 'Access Forbidden');
                done();
            });
        });
        test('Update Product Failure (No Access Token)', function(done){
            return request(app)
            .put('/product/' + id)
            .set('access_token', invalid_access_token)
            .send(updated_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message', 'token not not found');
                done();
            });
        });
        test('Update Product Failure (invalid id)', function(done){
            return request(app)
            .put('/product/' + invalidId)
            .set('access_token', access_token)
            .send(updated_product)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message', 'Product Not Found');
                done();
            });
        });
    });
    describe('DELETE /product/:id', ()=> {
        test('Delete Product Failure (Non Admin User)', function(done){
            return request(app)
            .delete('/product/' + id)
            .set('access_token', non_admin_access_token)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty('message', 'Access Forbidden');
                done();
            });
        });
        test('Delete Product Failure (No Access Token)', function(done){
            return request(app)
            .delete('/product/' + id)
            .set('access_token', invalid_access_token)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message', 'token not not found');
                done();
            });
        });
        test('Delete Product Failure (invalid id)', function(done){
            return request(app)
            .delete('/product/' + invalidId)
            .set('access_token', access_token)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty('message', 'Product Not Found');
                done();
            });
        });
        test('Delete Product Success', function(done){
            return request(app)
            .delete('/product/' + id)
            .set('access_token', access_token)
            .then(response=>{
                const {body,status} = response;
                expect(status).toBe(200);
                console.log(body);
                done();
            });
        });
    });
});