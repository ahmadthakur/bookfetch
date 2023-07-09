import axios from "axios";
import BookList from "./Components/BookList";

import { useState } from "react";
import Popular from "./Components/Popular";

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
      <h1>React App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchTerm" />
        <button type="submit">Search</button>
      </form>

      {books.length > 0 ? <BookList books={books} /> : <Popular />}
    </div>
  );
}

export default App;
