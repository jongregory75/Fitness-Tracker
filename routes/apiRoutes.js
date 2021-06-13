const path = require("path");
const router = require("express").Router();
const Workout = require("../models/workout.js");

//route is PUT /api/workouts/id
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
    });
});

//route is GET /api/workouts/range
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    // limiting the day to 7
    .limit(7)
    // decending order
    .sort({ _id: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => err);
});


router.get("/api/workouts", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
    });
});

  module.exports = router;