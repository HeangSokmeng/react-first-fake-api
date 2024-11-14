import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-wrap ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 p-4">
        <img className="w-100 h-96 object-cover rounded-lg fade-in" src={product.image} alt={product.title} />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 p-4 fade-in">
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-xl">Rating: {product.rating.rate} ★</span>
          <span className="ml-2 text-gray-500">({product.rating.count} Reviews)</span>
        </div>
        <p className="text-2xl font-semibold text-red-500 mb-4">${product.price}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>

        <button
          className="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-300 mb-2"
          onClick={() => alert('Product added to cart!')}
        >
          Buy Now
        </button>
        <button
          className="bg-red-300 text-white py-2 px-6 rounded-lg hover:bg-red-400 ml-4"
          onClick={() => alert('Product added to cart!')}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
