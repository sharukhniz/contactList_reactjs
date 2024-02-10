const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const connectDB = require("./database/DBconnection.js");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const router = require("./routes/router");
app.use("/", router);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
