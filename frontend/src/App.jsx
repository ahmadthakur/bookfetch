import axios from "axios";
import BookList from "./Components/BookList";
import "./style.css";

import { useState } from "react";
import Popular from "./Components/Popular";
import Footer from "./Components/Footer";

function App() {
  const [books, setBooks] = useState([]);

  // Define a function to handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the search term from the form
    const searchTerm = event.target.searchTerm.value;

    // Make an HTTP GET request to the backend API
    const axiosResponse = await axios.request({
      method: "GET",
      url: `http://localhost:3000/api/search?searchTerm=${searchTerm}`,
    });

    // Log the response data to the console
    console.log(axiosResponse.data.book);

    // Set the books state variable to the response data
    setBooks(axiosResponse.data.book);
  };

  return (
    <div>
      <div className="searchContainer">
        <a className="heading" href="/">
          <img className="logo" src="../public/Scribble.png" />
        </a>

        <form onSubmit={handleSubmit}>
          <input type="text" name="searchTerm" placeholder="Search Books..." />
        </form>
      </div>
      {books.length > 0 ? <BookList books={books} /> : <Popular />}
      <Footer />
    </div>
  );
}

export default App;
