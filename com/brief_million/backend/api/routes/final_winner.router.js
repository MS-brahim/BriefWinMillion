const finalWinnerController = require('../controllers/final_winner.controller');
const router = require('express').Router();

router.route('/:id').get(finalWinnerController.findFinalWin)
router.route('/post').post(finalWinnerController.postFinalWin)

module.exports = router;