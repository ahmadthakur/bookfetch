const router = require("express").Router();

const performScraping = require("../scraper");

router.get("/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const data = await performScraping(searchTerm);
  res.send(data);
});

module.exports = router;
