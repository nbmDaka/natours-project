const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const { createClient } = require("redis");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

const port = process.env.PORT || 4123;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
