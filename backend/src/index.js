const express = require("express");
const performScraping = require("./scraper");

const app = express();

const port = 3000;

app.get(`/`, async (req, res) => {
  const searchTerm = "Six of Crows";
  const data = await performScraping(searchTerm);
  json = JSON.stringify(data);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
