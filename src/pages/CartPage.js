import React from 'react';

function CartPage({ cart, setCart }) {
  const handleQuantityChange = (product, change) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            {cart.map(item => (
              <div key={item.id} className="border-b py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 mt-2">Remove</button>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(item, -1)} className="px-2">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item, 1)} className="px-2">+</button>
                </div>
                <p className="text-right">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <p>Items: {cart.length}</p>
            <p className="mt-2">Total Cost: <span className="font-bold">${totalCost}</span></p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
