const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DBCONNECT);
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");
const productRoute = require("./routes/product");

app.use("/user", userRoutes);
app.use("/product", productRoute);

app.listen(process.env.PORT, () => console.log("server listening"));
