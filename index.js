const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// mongoose.set("strictQuery", false);

const port = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

const start = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.use(cors());
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: false }));

//     app.use(router);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
start();

// app.listen(PORT, async () => {
//   console.log(`server up on port ${PORT}`);
// });
