const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3001

//Express setup info
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"));
const router = require("express").Router();

module.exports = app;

//Mongoose connection info
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//route is GET /api/workouts
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

//route is /api/workouts/range which should return the last weeks workouts
app.get("/api/workouts/range", (req,res)=>{
    db.Workout.aggregate()
      .addFields({
        totalDuration:{ $sum: '$exercises.duration' },
      })
      .limit(10)
      .sort({_id:-1})
      .then(data =>{
            res.json(data);
        }).catch(err =>{
            res.json(err);
        });
});

//route is PUT/Update findByIdAndUpdate //api/workouts/id
app.put("/api/workouts/:id", (req,res)=>{
  db.Workout.findByIdAndUpdate(req.params.id,{$push:{
      exercises: req.body,
  }}).then(data =>{
      res.json(data);
  }).catch(err =>{
      res.json(err);
  })
});

//route is POST/Create  //api/workouts
app.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
    });
});

//route is GET /exercise
app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

//route is GET /stats
app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});



