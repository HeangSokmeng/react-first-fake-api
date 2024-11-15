import React from 'react';

function ProductCard({ product, addToCart }) {
    return (
        <div className="border fade-in rounded-lg shadow-md p-4 transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex justify-center items-center">
                <img className="w-40 h-48 object-cover mb-4" src={product.image} alt={product.title} />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-500">Rating: {product.rating.rate} ★</span>
                <button
                    onClick={() => addToCart(product)}
                    className="bg-red-400 text-white py-1 px-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
