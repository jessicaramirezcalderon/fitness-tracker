const db = require("../models");
require("dotenv").config();

module.exports = function(app) {
    app.get("/exercise", (req, res) => {
        db.Workouts.find({})
            .populate('exercises')
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //other routes..
};//end of export










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