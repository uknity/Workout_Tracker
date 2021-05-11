const router = require('express').Router();
const path = require('path');

//where is the index route?
// router.get('/', (req, res) => {
//     console.log('you are in the index html route');
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});



module.exports = router;