const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(400).json(err);
    })
});

router.put('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {$push: {exercises: req.body }},
  ).then((data) => {
    console.log('workout by id updated to', data)
    res.json(data);
  }).catch( err => {
    res.json(err);
    console.log(err);
  })
})

module.exports = router;
