let mongoose = require("mongoose");
let db = require("../models");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

let exercisesSeed = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Lateral Pull",
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4
  },
  {
    type: "cardio",
    name: "Running",
    duration: 25,
    distance: 4
  },
  {
    type: "resistance",
    name: "Bench Press",
    duration: 20,
    weight: 285,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Bench Press",
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Quad Press",
    duration: 30,
    weight: 300,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Bench Press",
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Military Press",
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4
  }
];




let workoutSeed = [
  {
    day: new Date().setDate(new Date().getDate() - 10),
    exercises: []
  },
  {
    day: new Date().setDate(new Date().getDate() - 9),
    exercises: []
  },
  {
    day: new Date().setDate(new Date().getDate() - 8),
    exercises: []
  },
  {
    day: new Date().setDate(new Date().getDate() - 7),
    exercises: []
  },
  {
    day: new Date().setDate(new Date().getDate() - 6),
    exercises: []
  },
  {
    day: new Date().setDate(new Date().getDate() - 5),
    exercises: []
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: []
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: []
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: []
  }
];


db.Exercise.deleteMany({})
  .then(() => db.Exercise.collection.insertMany(exercisesSeed))
  .then(data => {
    console.log(data);
    workoutSeed.forEach((workout, i) => {
      workout.exercises = [mongoose.Types.ObjectId(data.ops[i]._id)];
    });
    return db.Workouts.deleteMany({});

  })
  .then(() => db.Workouts.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


