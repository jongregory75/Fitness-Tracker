const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001

const app = express();

const db = require("./models");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

module.exports = app;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get("/api/workouts", (req,res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })
});

app.get("/api/workouts/range", (req,res)=>{
    db.Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).limit(7).sort({_id:-1}).then(data =>{
            res.json(data);
        }).catch(err =>{
            res.json(err);
        })
});

//route is findByIdAndUpdate //
app.put("/api/workouts/:id", (req,res)=>{
  db.Workout.findByIdAndUpdate(req.params.id,{$push:{
      exercises: req.body,
  }}).then(data =>{
      res.json(data);
  }).catch(err =>{
      res.json(err);
  })
});

app.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
















app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

