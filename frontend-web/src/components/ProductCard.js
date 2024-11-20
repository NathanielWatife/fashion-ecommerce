import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-4 text-center">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-blue-600 font-bold">{product.price}</p>
            <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" to={`/product/${product.id}`}>
                <button>View Details</button>
            </Link>
        </div>
    );
};


export default ProductCard;