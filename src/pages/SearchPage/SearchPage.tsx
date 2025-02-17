import "../SearchPage/SearchPage.css";
import { IBook } from "../../types/type";
import React, { useEffect } from "react";
import { getBookData } from "../../slice/bookStore";
import { useDispatch, useSelector } from "react-redux";
import BookCart from "../../components/bookCart/bookCart";
import { Link } from "react-router-dom";

function SearchPage() {
  const data = useSelector((state: any) => state.bookStore.currentBooks);
  const searchText = useSelector((state: any) => state.bookStore.searchText);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getBookData());
  }, []);

  return (
    <div className="container search-page">
      <h1 className="search-page-title">{searchText} Search Results</h1>
      <p className="search-page-subtitle">Found {data.length} books</p>
      <div className="search-page-wrap">
        {data.length === 0 ? (
          <p>No results found</p>
        ) : (
          data.map((item: IBook, index: number) => (
              <BookCart key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchPage;
