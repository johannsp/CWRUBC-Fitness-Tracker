const mongojs = require("mongojs");
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
    db.Workout.create(body)
      .then(({ _id }) => {
        db.Workout.findOneAndUpdate(
          {},
          { $push: { exercises: _id } },
          { new: true }
        );
      })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts", (req, res) => {
    // eslint-disable-next-line camelcase
    db.Workout.findOne({}, {}, { sort: { created_at: -1 } })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", ({ params }, res) => {
    db.Workout.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          read: true
        }
      },

      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
};
