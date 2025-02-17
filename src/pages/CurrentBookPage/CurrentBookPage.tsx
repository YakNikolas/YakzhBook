import "../CurrentBookPage/CurrentBookPage.css";
import React, { useEffect, useState } from "react";
import { AddToCart, getCurrentBook, RemoveFromCart } from "../../slice/bookStore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IBook } from "../../types/type";

function CurrentBookPage() {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const data = useSelector((state: any) => state.bookStore.book);
  const cartId = useSelector((state: any) => state.bookStore.CartId);
  const dispatch = useDispatch<any>();
  const [activeTab, setActiveTab] = useState("description");
  const [inCart, setInCart] = useState(false);


  const {
    authors,
    error,
    image,
    isbn10,
    bookId,
    language,
    pages,
    pdf,
    price,
    publisher,
    rating,
    desc,
    subtittle,
    title,
    url,
    year,
  } = data;

  useEffect(() => {
    if (isbn13) {
      dispatch(getCurrentBook(isbn13));
      console.log(cartId)
      setInCart(cartId.some((id: string) => id === isbn13));
    }

  }, [isbn13]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <p>{desc}</p>;
      case "authors":
        return <p>Authors: {authors}</p>;
      case "reviews":
        return <p>No reviews available yet.</p>;
      default:
        return null;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (inCart) {
        dispatch(RemoveFromCart(isbn13));
        setInCart(false);
        console.log(cartId)

      }
      else {
        dispatch(AddToCart(isbn13));
        setInCart(true);
        console.log(cartId)
      }

  };

  return (
    <div className="container current-book-page">
      <div className="current-book-wrap">
        <div className="current-book-left">
          <img src={image} alt={title} className="current-book-image" />
        </div>
        <div className="current-book-right">
          <h1 className="current-book-title">{title}</h1>
          <span className="current-book-price">{price}</span>
          <div className="current-book-rating">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </div>
          <ul className="current-book-details">
            <li>
              <strong>Authors:</strong> {authors}
            </li>
            <li>
              <strong>Publisher:</strong> {publisher}
            </li>
            <li>
              <strong>Language:</strong> {language}
            </li>
            <li>
              <strong>Year:</strong> {year}
            </li>
            <li>
              <strong>Pages:</strong> {pages}
            </li>
          </ul>
          <button
            onClick={handleClick}
            className="add-to-cart-button"
          >
            {inCart? 'remove from cart' : 'add in cart'}
          </button>
        </div>
      </div>
      <div className="current-book-tabs">
        <button
          className={`tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`tab ${activeTab === "authors" ? "active" : ""}`}
          onClick={() => setActiveTab("authors")}
        >
          Authors
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="current-book-content">{renderTabContent()}</div>
    </div>
  );
}

export default CurrentBookPage;
