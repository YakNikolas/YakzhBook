import { useDispatch } from "react-redux";
import {
  DecreaseCount,
  IncreaseCount,
  RemoveFromCart,
} from "../../slice/bookStore";
import "./CardCart.css";

function CardCart({ item }: { item: any }) {
  const dispatch = useDispatch();
  const { title, authors, isbn13, price, image, count } = item;

  return (
    <div className="card-cart">
      <div className="card-cart-img">
        <img src={image} alt={title} />
      </div>
      <div className="card-cart-description">
        <div className="card-cart-description-left">
          <h3 className="card-cart-title">{title}</h3>
          <span className="card-cart-authors">by {authors}</span>
          <div className="card-cart-counter">
            <button
              className="card-cart-btn"
              onClick={() => dispatch(DecreaseCount(isbn13))}
            >
              -
            </button>
            <span className="card-cart-count">{count}</span>
            <button
              className="card-cart-btn"
              onClick={() => dispatch(IncreaseCount(isbn13))}
            >
              +
            </button>
          </div>
        </div>
        <div className="card-cart-description-right">
          <span className="card-cart-price">{price}</span>
          <button
            className="card-cart-remove-btn"
            onClick={() => dispatch(RemoveFromCart(isbn13))}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
