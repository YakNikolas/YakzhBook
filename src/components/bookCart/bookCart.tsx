import "./bookCart.css";
import { IBook } from "../../types/type";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../slice/bookStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface BookCartProps {
  item: IBook;
}

function BookCart({ item }: BookCartProps) {
  const { image, isbn13, price, subtitle, title } = item;
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  
  const cart = useSelector((state: any) => state.bookStore.CartId);

  useEffect(() => {
    setInCart(cart.some((book:string) => book === isbn13));
  }, [cart, isbn13]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
      if (inCart) {
        dispatch(RemoveFromCart(isbn13));
        setInCart(false);
      }
      else {
        dispatch(AddToCart(isbn13));
        setInCart(true);
      }

  };

  return (
    <div className="book-card">
      <Link to={`/CurrentBookPage/${isbn13}`} className="book-link">
        <div className="book-card-image">
          <img src={image} alt={title} />
        </div>
        <div className="book-card-info">
          <h3 className="book-card-title">{title}</h3>
          <p className="book-card-subtitle">by {subtitle}</p>
          <span className="book-card-price">{price}</span>
        </div>
      </Link>
      <button onClick={handleClick} className={inCart ? "book-card-button added" : "book-card-button"}>
      {inCart ? "Remove from cart" : "Add in cart"}
      </button>
    </div>
  );
}

export default BookCart;
