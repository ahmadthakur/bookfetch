import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./lists.scss";

const Popular = () => {
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
    <div className="list">
      <h1 className="title">Popular This Week</h1>
      <p className="subheading">Current Top Books: Must-Reads of the Moment</p>

      <ul className="book__grid">
        {popularBooks.map((book) => {
          return (
            <li className="book__list__item" key={book.rank}>
              <Link to={`/book/${book.title}`}>
                <img
                  className="book__cover"
                  src={book.book_image}
                  alt="Book cover"
                />
              </Link>

              <div className="book__info">
                <h1 className="book__title">{book.title}</h1>
                <p className="book__author">{book.author}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Popular;
