import BookList from "./Components/BookList";
import "./style.css";
import Search from "./Components/Search";
import Popular from "./Components/Popular";
import Footer from "./Components/Footer";
import axios from "axios";
import { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [popularBookSearch, setPopularBookSearch] = useState([]);

  // Define a function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.searchTerm.value;

    const axiosResponse = await axios.request({
      method: "GET",
      url: `https://ebook-site.fly.dev/api/search?searchTerm=${searchTerm}`,
      // url: `http://localhost:8080/api/search?searchTerm=${searchTerm}`,
    });

    if (axiosResponse.data.book.length === 0) {
      alert("No results found. Please try again.");
    } else {
      setBooks(axiosResponse.data.book);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    let searchTerm = event.target.value;

    const axiosResponse = await axios.request({
      method: "GET",
      url: `https://ebook-site.fly.dev/api/search?searchTerm=${searchTerm}`,
      // url: `http://localhost:8080/api/search?searchTerm=${searchTerm}`,
    });

    if (axiosResponse.data.book.length === 0) {
      alert("No results found. Please try again.");
    } else {
      setBooks(axiosResponse.data.book);
      console.log(searchTerm);
      setPopularBookSearch(axiosResponse.data.book);
    }
  };

  return (
    <div>
      <Search
        handleSubmit={handleSubmit}
        popularBookSearch={popularBookSearch}
      />
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Popular handleClick={handleClick} />
      )}

      <Footer />
    </div>
  );
}

export default App;
