const roundController = require('../controllers/round.controller');
const router = require('express').Router();

router.route('/').get(roundController.findAllRound)
router.route('/post').post(roundController.postRound)


module.exports = router;