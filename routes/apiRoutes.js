const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workout", (req, res) => {
  console.log('you are in api/workout api routes');
  Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/api/workout", ({ body }, res) => {
  console.log('you are in the post api/workout route in apiRoutes');
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workout/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, {
    $push: {
      exercises: req.body,
    },
  })
    .then((data) => {
      console.log("workout by id updated to", data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// router.get('/api/workouts/range', (req, res) => {
router.get("/api/workout/range", async (req, res) => {
  console.log("you are in apiRoutes get workouts range");
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({
      _id: -1,
    })
    .limit(7)
    .then((workoutData) => {
      console.log("workout range data", workoutData);
      res.json(workoutData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
module.exports = router;

