import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import Carousel from './components/carousel'; // Import the Carousel component
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartPage from './pages/CartPage';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const isProductInCart = prevCart.find(item => item.id === product.id);
      if (isProductInCart) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.title} added to cart!`);
  };
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div>
        {/* Menu Section */}
        <nav className="bg-pink-200 text-red-600 py-2">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold">Gazelle</a>
              <img src="logo.png" alt="Logo" className="ml-2 h-6 w-6" />
            </div>
            <div className="flex space-x-6">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category}`}
                  key={index}
                  className="hover:text-gray-700 capitalize"
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="flex space-x-4">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.6L21 12l-2.4-2.6a2.032 2.032 0 01-.595-1.395L20 7h-5" />
                </svg>
              </button>
              <Link to="/cart">
                {totalItems > 0 && <span className="text-xs bg-red-600 text-white rounded-full px-1">{totalItems}</span>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>

              </Link>
            </div>
          </div>
        </nav>
        <Carousel />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard product={product} addToCart={addToCart} />
                  </Link>
                ))}
              </div>
            } />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/product/:productId" element={<ProductDetail products={products} />} />
            <Route path="/category/:category" element={<CategoryProducts products={products} addToCart={addToCart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function CategoryProducts({ products, addToCart }) {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
  }, [category, products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Link>
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default App;
