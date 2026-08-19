import { useMemo } from "react";
import useCart from "../hooks/useContext";
import CartItem from "./CartItem";

const Cart = () => {
    const { state, dispatch } = useCart()
    const cart = state?.cart ?? []

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const handleClearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-panel">
        <h2>
          Your Cart
        </h2>

        <p className="cart-empty-text">
          Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="cart-panel">

      <div className="cart-header">
        <h2>
          Your Cart ({totalItems})
        </h2>

        <button
          type="button"
          onClick={handleClearCart}
          className="shop-btn-danger"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="cart-totals">

        <div className="cart-totals-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="cart-totals-row bold">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

      </div>

    </div>
  );
};

export default Cart;