import { useEffect, useState } from "react";

const Popular = (props) => {
  // Initialize state for popular books
  const [popularBooks, setPopularBooks] = useState([]);

  // Fetch popular books from NY Times API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction?api-key=VeOvGjOewN1jrHtPjqSPGKqvU20EU6hg`
        );
        const data = await response.json();
        const books = data.results.books;
        setPopularBooks(books);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="pageTitle">Popular This Week</h1>

      <ul className="bookGrid">
        {popularBooks.map((book) => {
          return (
            <li className="bookListItem" key={book.rank}>
              <img
                className="bookCover"
                src={book.book_image}
                alt="Book cover"
              />
              <div className="bookInfo">
                <h1>{book.title}</h1>
                <p className="author">{book.author}</p>

                <button
                  value={book.title + " " + book.author}
                  className="bookButton"
                  // eslint-disable-next-line react/prop-types
                  onClick={props.handleClick}
                >
                  Search Book
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Popular;
