const express = require("express");
const searchRoute = require("./routes/search");
const cors = require("cors");

const app = express();

app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", searchRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
