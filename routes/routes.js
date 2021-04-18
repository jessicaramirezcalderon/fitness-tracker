const db = require("../models");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");


//front-end routes

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
    db.Workouts.find({})
        .populate('exercises')
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workouts.create(req.body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    const exercise = new db.Exercise(req.body);
    return exercise.save()
        .then(() => {
            return db.Workouts.findOne({_id: req.params.id})
                .populate();
        })
        .then((workout) => {
            console.log(workout);
            workout.exercises.push(exercise._id);
            return workout.save();
        })
        .then((workout) => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;









// db.User.create({ name: "Ernest Hemingway" })
//     .then(dbUser => {
//         console.log(dbUser);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });

//need to update route to match page

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