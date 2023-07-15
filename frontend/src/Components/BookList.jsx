/* eslint-disable react/prop-types */

import "../style.css";

function BookList(props) {
  return (
    <div>
      <h1 className="pageTitle">Results</h1>

      <ul className="bookGrid">
        {props.books.map((book) => {
          return (
            <li className="bookListItem" key={book.index}>
              <img
                className="bookCover"
                src={book.bookCoverImage}
                alt="Book cover"
              />
              <div className="bookInfo">
                <h1>{book.bookName}</h1>
                <p className="author">{book.authorName}</p>
                <a href={book.downloadLink}>
                  <button className="bookButton">Download</button>
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
