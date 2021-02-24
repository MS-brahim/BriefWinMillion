const questionController = require('../controllers/question.controller');
const verifyTokenAdmin = require('../validation/verifyTokenAdmin');

const router = require('express').Router();

router.route('/').get(verifyTokenAdmin, questionController.getQuestin)
router.route('/post').post(verifyTokenAdmin, questionController.postQuestion)

// router.route('/update/:id').patch(verifyTokenAdmin, questionController.updateQuestion)
// router.route('/delete/:id').delete(verifyTokenAdmin, questionController.deleteQuestion)

module.exports = router;