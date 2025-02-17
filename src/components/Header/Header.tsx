import { useState, useRef } from "react";
import "../Header/Header.css";
import { useDispatch } from "react-redux";
import { searchBookData } from "../../slice/bookStore";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    dispatch(searchBookData(text));

    if (text.trim() !== "") {
      navigate("/searchPage");
    } else {
      navigate("/");
    }
  };

  const handleSearchButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (searchText.trim() !== "") {
      navigate("/searchPage");
    }
  };

  return (
    <header className="header">
      <div className="header-wrap">
        <Link to="/" className="header-title-link">
          <h2 className="header-title">YAKZHBOOK</h2>
        </Link>
        <div className="search-container">
          <input
            ref={inputRef}
            value={searchText}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="search-input"
          />
          <button className="search-button" onClick={handleSearchButtonClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <Link to="/Cardpage">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
