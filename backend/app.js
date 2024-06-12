const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const homeRouter = require("./routes/homeRoutes");

const sq = require("./util/database");

app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.use(homeRouter);

sq.sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
