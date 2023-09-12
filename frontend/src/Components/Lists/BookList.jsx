/* eslint-disable react/prop-types */
import "./lists.scss";
import { Link } from "react-router-dom";

function BookList(props) {
  return (
    <div className="list">
      <h1 className="title">Results</h1>

      <ul className="book__grid">
        {props.books.map((book) => {
          return (
            <li className="book__list__item" key={book.index}>
              <Link to={`/book/${book.id}`}>
                <img
                  className="book__cover"
                  src={book.bookCoverImage}
                  alt="Book cover"
                />
              </Link>

              <div className="book__info">
                <h1 className="book__title">{book.bookName}</h1>
                <p className="book__author">{book.authorName}</p>
                <a href={book.downloadLink}>
                  <button className="download__button">Download</button>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
