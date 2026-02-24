import { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      price: 100,
    };

    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);

    // Manually sync total
    // setTotalPrice(totalPrice + newItem.price);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    // ❌ Intentionally forget to update totalPrice
  };

  return (
    <div>
      <h2>Total: ₹{totalPrice}</h2>
      <button onClick={addItem}>Add Item (₹100)</button>
      <p>Items: {cartItems.length}</p>
      {cartItems.map((item) => (
        <div key={item.id}>
          ₹{item.price}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
