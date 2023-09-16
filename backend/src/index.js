// Import dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

// Import routes
const searchRoute = require("./routes/search");
const dataRoute = require("./routes/data");

// Create Express app
const app = express();

// Enable CORS
app.use(
  cors({
    origin: true,
  })
);

// Set port
const port = process.env.PORT || 8080;

// Define routes
app.use("/api", dataRoute);
app.use("/api", searchRoute);

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Define function to make Axios request
const makeAxiosRequest = () => {
  axios
    .get(
      `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction?api-key=${process.env.NY_TIMES_API_KEY}`
    )
    .then((response) => {
      const ISBNs = response.data.results.books.map(
        (book) => book.isbns[0].isbn10
      );
      console.log(ISBNs);
      return ISBNs;
    })
    .then((ISBNs) => {
      const books = ISBNs.map((ISBN) =>
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}&langRestrict=en&key=${process.env.GOOGLE_BOOKS_API_KEY}`
          )
          .then((response) => {
            const data = response.data;
            return data.items.length > 0 ? data.items[0] : null;
          })
      );
      return Promise.all(books);
    })
    .then((data) => {
      const filteredData = data.filter((item) => item !== null);
      console.log(filteredData);
      return filteredData;
    })
    .then((data) => {
      fs.writeFile("data.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Set an initial delay of 1 second to avoid immediate execution
setTimeout(() => {
  // Call the Axios request function immediately when the script starts
  makeAxiosRequest();

  // Set an interval to run the Axios request every 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const intervalInMilliseconds = 24 * 60 * 60 * 1000;
  setInterval(() => {
    makeAxiosRequest();
  }, intervalInMilliseconds);
}, 1000); // Initial delay of 1 second
