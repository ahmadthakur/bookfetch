/* eslint-disable react/prop-types */
function BookList(props) {
  return (
    <div>
      <h1>Results</h1>

      <ul>
        {props.books.map((book) => {
          return (
            <li key={book}>
              <img src={book.bookCoverImage} alt="Book cover" />
              <h2>{book.bookName}</h2>
              <h3>{book.authorName}</h3>
              <p>{book.ISBN}</p>
              <a href={book.downloadLink}>Download</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
