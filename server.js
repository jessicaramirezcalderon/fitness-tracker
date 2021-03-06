const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("./routes/routes.js"));

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

//console log db connection for debugging
mongoose.connection.on('error', (e) => console.error(`connection error: ${e.message}`));
mongoose.connection.once('open', () => console.info('Successfully connected to the database.'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
