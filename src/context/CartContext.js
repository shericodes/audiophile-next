import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  removeAllFromCart: () => {},
  getTotalCost: () => {},
  openCart: () => {},
  closeCart: () => {},
  toggleCartOpenState: () => {},
  getGrandTotal: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const SHIPPING = 50;

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(item) {
    const quantity = getProductQuantity(item.id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          ...item,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function updateCartQuantity(item, quantityToAdd) {
    const quantity = getProductQuantity(item.id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          ...item,
          quantity: quantityToAdd,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + quantityToAdd }
            : product
        )
      );
    }
  }

  function removeOneFromCart(item) {
    const quantity = getProductQuantity(item.id);

    if (quantity == 1) {
      deleteFromCart(item.id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function removeAllFromCart() {
    setCartProducts([]);
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      totalCost += cartItem.price * cartItem.quantity;
    });
    return totalCost;
  }

  function toggleCartOpenState() {
    setCartIsOpen(!cartIsOpen);
  }

  function openCart() {
    setCartIsOpen(true);
  }

  function closeCart() {
    setCartIsOpen(false);
  }

  function getGrandTotal() {
    return getTotalCost() + SHIPPING;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    updateCartQuantity,
    deleteFromCart,
    removeAllFromCart,
    getTotalCost,
    toggleCartOpenState,
    cartIsOpen,
    closeCart,
    openCart,
    getGrandTotal,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
