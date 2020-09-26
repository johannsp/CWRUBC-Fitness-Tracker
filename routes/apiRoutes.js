const mongoose = require("mongoose");
const db = require("../models");

module.exports = function(app) {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  app.post("/api/workouts", ({ body }, res) => {
    const data = {
      day: new Date(),
      exercises: [
        {
          type: body.type,
          name: body.name,
          duration: body.duration,
          weight: body.weight,
          reps: body.reps,
          sets: body.sets
        }
      ]
    };
    db.Workout.create(data)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .sort({ day: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .sort({ day: -1 })
      .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    console.log("∞° PUT /api/workouts/:id");
    console.log("∞° req.body=\n" + JSON.stringify(req.body));
    const exercises = [
      {
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets
      }
    ];
    console.log("∞° exercises[0]=\n" + JSON.stringify(exercises[0]));
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { exercises: exercises },
      { new: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
