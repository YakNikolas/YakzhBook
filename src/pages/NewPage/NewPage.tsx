import "../NewPage/NewPage.css";
import { IBook } from "../../types/type";
import React, { useEffect } from "react";
import { getBookData } from "../../slice/bookStore";
import { useDispatch, useSelector } from "react-redux";
import BookCart from "../../components/bookCart/bookCart";


function NewPage() {
  const data = useSelector((state: any) => state.bookStore.currentBooks);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getBookData());
  }, []);

  return (
    <div className="container">
      <h1 className="new-page-title">New Releases Books</h1>
      <div className="new-page-grid">
        {data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          data.map((item: IBook) => (
              <BookCart key={item.isbn13} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default NewPage;
