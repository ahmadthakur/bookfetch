// Import the required modules
const cheerio = require("cheerio");
const axios = require("axios");

// Define an asynchronous function to perform the scraping
async function performScraping(searchTerm) {
  try {
    // Make an HTTP GET request to the specified URL
    const axiosResponse = await axios.request({
      method: "GET",
      url: `https://libgen.is/fiction/?q=${searchTerm}&language=English&format=epub`,
      headers: {
        // Set the User-Agent header to identify the client making the request as a web browser
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    // Load the HTML response into a Cheerio object
    const $ = cheerio.load(axiosResponse.data);

    // Define an array to store the scraped data
    let books = [];

    // Iterate over each table row in the HTML response
    $("table")
      .find("tr")
      .each((index, row) => {
        // Extract the author name, book name, and MD5 hash from the table row
        const authorName = $(row).find(".catalog_authors").find("a").text();

        const bookName = $(row).find("td").find("p").find("a").text();
        let isbn = $(row)
          .find(".catalog_identifier")
          .text()
          .replace("ISBN:", "")
          .trim();

        //get the first isbn if there are multiple seperated by comma
        isbn = isbn.split(",")[0];

        if (isbn) {
          isbn = isbn.replace("ISBN:", "");
        } else {
          isbn = "Not Available";
        }

        let md5 = $(row).find("td").find("p").find("a").attr("href");
        // If the MD5 hash is present, extract it and construct the download link
        if (md5) {
          md5 = md5.toLowerCase();
          md5 = md5.replace("/fiction/", "");
        } else {
          // If the MD5 hash is not present, log an error and skip this row
          console.error("Error: href attribute not found");
          return;
        }

        const downloadLink = `https://cdn1.booksdl.org/get.php?md5=${md5}&key=017CTP22EVYW2J2L&mirr=1`;

        // Get the book cover image from openlibrary.org
        const bookCoverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

        // If the book cover image is not found, add a placeholder image
        if (!bookCoverImage) {
          books.push({
            index: index,
            authorName: authorName,
            bookName: bookName,
            downloadLink: downloadLink,
            ISBN: isbn,
            bookCoverImage:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
          });
          return;
        }

        // Add the author name, book name, and download link to the books array
        books.push({
          index: index,
          authorName: authorName,
          bookName: bookName,
          downloadLink: downloadLink,
          ISBN: isbn,
          bookCoverImage: bookCoverImage,
        });
      });

    // Remove the first element of the books array (which contains the table header)
    books.shift();

    // Remove entries that do not have an ISBN
    books = books.filter((book) => book.ISBN !== "Not Available");

    // Construct an object to store the scraped data
    const scrapedData = {
      book: books,
    };

    // Log the scraped data to the console
    console.log("Scraped data:", scrapedData);

    // Return the scraped data
    return scrapedData;

    console.log("Scraping complete");
  } catch (error) {
    // Log any errors to the console
    console.log(error);
  }
}

// Call the performScraping function (for testing purposes)
performScraping();

// Export the performScraping function for use in other modules
module.exports = performScraping;
