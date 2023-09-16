const router = require("express").Router();
const data = require("../../data.json");

router.get("/data", async (req, res) => {
  res.send(data);
});

module.exports = router;
