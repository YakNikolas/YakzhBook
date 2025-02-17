import "../CartPage/CartPage.css";
import React, { useEffect } from "react";
import { getCardBook, GetTotalPrice } from "../../slice/bookStore";
import { useDispatch, useSelector } from "react-redux";
import CardCart from "../../components/CardCart/CardCart";

function CardPage() {
  const data = useSelector((state: any) => state.bookStore.cart);
  const bookId = useSelector((state: any) => state.bookStore.CartId);
  const totalPrice = useSelector((state: any) => state.bookStore.totalPrice);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCardBook(bookId));
  }, []);

  useEffect(() => {
    dispatch(GetTotalPrice());
  }, [data, bookId]);

  return (
    <div className="container">
      <h1 className="cart-page-title">Your Cart</h1>
      <div className="cart-page-wrap">
        {data.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          data.map((item: any, index: number) => (
            <CardCart key={index} item={item} />
          ))
        )}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-line">
          <span>Sum total:</span>
          <span>${(parseFloat(totalPrice) * 0.85).toFixed(2)}</span>
        </div>
        <div className="cart-summary-line">
          <span>VAT:</span>
          <span>${(parseFloat(totalPrice) * 0.15).toFixed(2)}</span>
        </div>
        <div className="cart-summary-total">
          <span>TOTAL:</span>
          <span>${totalPrice}</span>
        </div>
        <button className="checkout-button">CHECK OUT</button>
      </div>
    </div>
  );
}

export default CardPage;
