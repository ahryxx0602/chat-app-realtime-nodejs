// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// 1. Kết nối MongoDB
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Thiết lập view engine EJS + layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// 4. Static files (CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/emoji-picker",
  express.static(__dirname + "/node_modules/emoji-picker-element")
);

// 5. Routes
app.use("/", authRoutes);
app.use("/api", authRoutes);

module.exports = app;
