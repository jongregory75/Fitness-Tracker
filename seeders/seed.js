const mongoose = require('mongoose');
const db = require('../models/');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
// var MONGODB_URI = mongodb+srv://dbUser:Ammo1975!@#$@cluster0.udj22.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect( MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}
);

// mongoose.connect("mongodb://localhost/workout", {
//   
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

const workoutSeed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    exercises: [
      {
        type: 'resistance',
        name: 'Back Squat',
        duration: 20,
        weight: 275,
        reps: 3,
        sets: 6,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    exercises: [
      {
        type: 'resistance',
        name: 'Quad Extension',
        duration: 20,
        weight: 125,
        reps: 6,
        sets: 5,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    exercises: [
      {
        type: 'resistance',
        name: 'Farmer Carry',
        duration: 20,
        weight: 280,
        reps: 1,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'resistance',
        name: 'Bench Press',
        duration: 25,
        weight: 295,
        reps: 5,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'resistance',
        name: 'Cable Face Pulls',
        duration: 25,
        weight: 16,
        reps: 12,
        sets: 5,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'resistance',
        name: 'Incline Dumbell Bench Press',
        duration: 20,
        weight: 200,
        reps: 6,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'resistance',
        name: 'Dumbell flys',
        duration: 20,
        weight: 160,
        reps: 6,
        sets: 5,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'resistance',
        name: 'Deadlift',
        duration: 30,
        weight: 355,
        reps: 6,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'resistance',
        name: 'Reverse Hyper',
        duration: 20,
        weight: 160,
        reps: 10,
        sets: 5,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'resistance',
        name: 'Hip Sled',
        duration: 20,
        weight: 600,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'resistance',
        name: 'Planks',
        duration: 60,
        weight: 250,
        reps: 1,
        sets: 3,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    exercises: [
      {
        type: 'resistance',
        name: 'Standing Barbell Military Press',
        duration: 20,
        weight: 155,
        reps: 8,
        sets: 4,
      },
    ],
  },{
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    exercises: [
      {
        type: 'resistance',
        name: 'Sumo High Pulls',
        duration: 20,
        weight: 155,
        reps: 8,
        sets: 4,
      },
    ],
  },{
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    exercises: [
      {
        type: 'resistance',
        name: 'Skull crushers',
        duration: 20,
        weight: 115,
        reps: 8,
        sets: 4,
      },
    ],
  }
];

db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);

    process.exit(1);
  });
