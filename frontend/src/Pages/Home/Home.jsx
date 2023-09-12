import { useState } from "react";
import axios from "axios";
import BookList from "../../Components/Lists/BookList";
import Popular from "../../Components/Lists/Popular";
import Search from "../../Components/Search/Search";
import "./home.scss";

function Home() {
  // Define state variables for books and popular book search
  const [books, setBooks] = useState([]);
  const [popularBookSearch, setPopularBookSearch] = useState([]);

  // Define a function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.searchTerm.value;

    // Make a GET request to the API with the search term
    const axiosResponse = await axios.get(
      `https://ebook-site.fly.dev/api/search?searchTerm=${searchTerm}`
    );

    // If no books are found, show an alert
    if (axiosResponse.data.book.length === 0) {
      alert("No results found. Please try again.");
    } else {
      // Otherwise, set the state with the books
      setBooks(axiosResponse.data.book);
    }
  };

  // Define a function to handle the popular book search button click
  const handleClick = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.value;

    // Make a GET request to the API with the search term
    const axiosResponse = await axios.get(
      `https://ebook-site.fly.dev/api/search?searchTerm=${searchTerm}`
    );

    // If no books are found, show an alert
    if (axiosResponse.data.book.length === 0) {
      alert("No results found. Please try again.");
    } else {
      // Otherwise, set the state with the books and the popular book search
      setBooks(axiosResponse.data.book);
      console.log(searchTerm);
      setPopularBookSearch(axiosResponse.data.book);
    }
  };

  return (
    <div className="home">
      {/* Render the search component with the handleSubmit function and the popular book search */}
      <Search
        handleSubmit={handleSubmit}
        popularBookSearch={popularBookSearch}
      />
      {/* If there are books, render the BookList component with the books */}
      {/* Otherwise, render the Popular component with the handleClick function */}
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Popular handleClick={handleClick} />
      )}
    </div>
  );
}

export default Home;
