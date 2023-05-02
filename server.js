const express = require("express");
const mongodb = require("./config/connection");
const router = require("./route");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

mongodb.once("open", () => {
  console.log("mongodbconnected");
  app.listen(PORT, () => {
    console.log(`serlistening - http://localhost:${PORT}`);
  });
});
