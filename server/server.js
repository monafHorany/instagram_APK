require("dotenv").config();
const express = require("express");
const mongoString = process.env.DATABASE_URL;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
const path = require("path");
app.use(express.json());
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  app.listen().close();
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use("/api", require("./routes/insta_release_route"));
app.use("/api", require("./routes/crud"));
app.use(express.static(path.join("public")));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});


app.listen(5000);
