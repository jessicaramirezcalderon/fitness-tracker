const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;