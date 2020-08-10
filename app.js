const express = require("express");
const app = express();
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Cors used for FCC testing purposes
app.use(cors({ optionSuccessStatus: 200 }));

// Serving styles and scripts from public dir
app.use(express.static("public"));

// Main route defined
app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ` + port));
