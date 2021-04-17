const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// db.User.create({ name: "Ernest Hemingway" })
//     .then(dbUser => {
//         console.log(dbUser);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });

app.get("/exercise", (req, res) => {
    db.Workouts.find({})
        .populate('exercises')
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});//need to update route to match page

// app.get("/user", (req, res) => {
//     db.User.find({})
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.post("/submit", ({ body }, res) => {
//     db.Note.create(body)
//         .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/populateduser", (req, res) => {
//     db.User.find({})
//         .populate("notes")
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
