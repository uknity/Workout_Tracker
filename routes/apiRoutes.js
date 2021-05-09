const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({
  body
}, res) => {
  Workout.create(body)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(400).json(err);
    })
});

router.put('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id, {
      $push: {
        exercises: req.body
      }
    },
  ).then((data) => {
    console.log('workout by id updated to', data)
    res.json(data);
  }).catch(err => {
    res.json(err);
    console.log(err);
  })
});

// router.get('/api/workouts/range', (req, res) => {
  router.get('/api/workouts/range', async (req, res) => {

    console.log('you are in apiRoutes get workouts range');
    let workoutData = await Workout.find({}).sort({ field: 'asc', test: -1 }).limit(7);
    // workoutData.aggregate([
      const sum = 0;
      for (i=0; i < 7; i++) {
        let totalSum = sum + workoutData[i].exercises.totalDuration;
        console.log(totalSum);

      }
      console.log('workout range data', workoutData);
      res.json(workoutData);
    });
    // Workout.find({})
    // .then(Workout => {
      // let workoutRange = Workout.aggregate([
      //   {$sort: ({day:-1 })},
      //   { $limit: 7 },
      //  ]);
      // console.log('workout range data', workoutRange);
      // return workoutRange;
   
    
  // .catch (err => {
  //   res(err);
  
  // });
// });

  // Workout.aggregate([{
  //     $addFields: {
  //       "exercises.totalWeight": "testing"
  //     }
  //   }]

//   ).then((data) => {
//     res.json(data);
//     console.log('data', data)
//   }).catch(err => {
//     res.status(400).json(err);
//   })
// });
// router.get('api/workouts/range', (req, res) => {
//   Workout.aggregate([
//     { $sort: ({day:-1 })},
//     { $limit: 7 },
//     { $sum: ({exercises.weight}) }
//     ])



module.exports = router;