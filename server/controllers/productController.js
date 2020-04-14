const { Product } = require('../models');
class ProductController {
    static showProducts (req, res, next){
        Product.findAll({order: [['id', 'DESC']]})
        .then((products)=>{
            res.status(200).json({products})
        })
        .catch(next);
    }
    static addProduct (req, res, next){
        const {name, image_url, price, stock} = req.body;
        Product.create({name, image_url, price, stock})
        .then((product)=>{
            res.status(201).json({product})
        })
        .catch(next);
    }
    static editProduct (req, res, next){
        const {name, image_url, price, stock} = req.body;
        console.log('test')
        let id = req.params.id;
        Product.findByPk(id)
        .then((product)=>{
            if(product){
                return Product.update({name, image_url, price, stock}, {where: {id:id}})
            }else{
                throw new Error('Product Not Found');
            }
        })
        .then(() => {
            return Product.findByPk(id);
        })
        .then((product)=>{
            res.status(200).json({product});
        })
        .catch(next);
    }
    static deleteProduct (req, res, next){
        let id = req.params.id;
        Product.findByPk(id)
        .then((product)=>{
            if(product){
                return Product.destroy({where: {id:id}})
            }else{
                throw new Error('Product Not Found');
            }
        })
        .then(()=>{
            res.status(200).json({message: 'Product Successfully Deleted'});
        })
        .catch(next);
    }
}
module.exports = ProductController;