import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../redux/productSlice';
import ProductCard  from "../components/ProductCard";


const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    if (loading){
        return <p>Loading products...</p>
    }

    return (
        <div className="home-page">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;