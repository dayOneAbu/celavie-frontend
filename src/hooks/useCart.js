import { createContext, useContext, useEffect, useState } from "react";
import { getStoredData, setStoredData } from "../utils/storageHelper";

const CartContext = createContext();

export function CartProvider({ children }) {
  const initCart = {
    products: {},
  };
  const [cart, setCart] = useState(initCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const data = getStoredData("cartItems");
    if (data) {
      setCart(data);
    }
  }, []);

  useEffect(() => {
    setStoredData("cartItems", cart);
  }, [cart]);

  let cartItems = Object.keys(cart.products).map((key) => {
    return {
      ...cart.products[key],
    };
  });

  const addToCart = (id, name, slug, price, imageURL, imageALT) => {
    setCart((prev) => {
      let cartState = { ...prev };
      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          quantity: 1,
          id,
          name,
          slug,
          price,
          imageURL,
          imageALT,
        };
      }
      return cartState;
    });
  };
  const removeFromCart = (key) => {
    setCart((prev) => {
      let cartState = { ...prev };
      if (cartState.products[key].quantity > 1) {
        cartState.products[key].quantity = cartState.products[key].quantity - 1;
        return cartState;
      } else {
        delete cartState.products[key];
        return cartState;
      }
    });
  };
  const subTotal = cartItems.reduce((accumulator, { quantity, price }) => {
    return accumulator + quantity * price;
  }, 0);
  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);
  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        addToCart,
        subTotal,
        totalItems,
        cartItems,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
