const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(__dirname + "/static"));
app.use("/", require("./routes"));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

app.use(cors);

/* Mongoose Setup */

const PORT = process.env.PORT || 6001;
//mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (client, err) => {
    try {
      console.log("Connected to db: " + client);
    } catch (err) {
      console.log(err);
    }
  }
);

app.listen(PORT, function () {
  console.log("This server port is up and running at port: " + PORT);
});
