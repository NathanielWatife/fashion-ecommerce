const Product = require('../models/Product');

// get all the products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// get product by Id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: 'Product not found'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// add new product admin only
exports.addProduct = async (req, res) => {
    try {
        const { title, description, price, image, category, stock } = (req.body);
        const newProduct = new Product({ title, description, price, image, category, stock});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update products by admin only
exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updateProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updateProduct);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};



// delete a product using Id by admin only
exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};