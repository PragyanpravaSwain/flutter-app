const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port " + (process.env.PORT || 5000));
});
