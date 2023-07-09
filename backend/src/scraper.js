const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping(searchTerm) {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  const axiosResponse = await axios.request({
    method: "GET",
    url: `https://libgen.is/fiction/?q=${searchTerm}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);

  // initializing the data structures
  // that will contain the scraped data
  const books = [];

  // scraping the "Learn how web data is used in your market" section
  $("table")
    .find("tr")
    .each((index, row) => {
      // extracting the data of interest

      const authorName = $(row)
        .find("td")
        .find(".catalog_authors")
        .find("a")
        .text();

      const bookName = $(row).find("td").find("p").find("a").text();
      let md5 = $(row).find("td").find("p").find("a").attr("href");
      if (md5) {
        md5 = md5.toLowerCase();
        md5 = md5.replace("/fiction/", "");
      } else {
        console.error("Error: href attribute not found");
        return;
      }

      const downloadLink = `https://cdn1.booksdl.org/get.php?md5=${md5}&key=017CTP22EVYW2J2L&mirr=1`;

      //Make each of these books a seperate onject
      const book = {
        authorName: authorName,
        bookName: bookName,
        downloadLink: downloadLink,
      };

      // storing the extracted data
      books.push(book);
      //remove first element of array
    });

  books.shift();
  // trasforming the scraped data into a general object
  const scrapedData = {
    book: books,
  };
  console.log("Scraped data:", scrapedData);

  return scrapedData;
}

performScraping();

module.exports = performScraping;
