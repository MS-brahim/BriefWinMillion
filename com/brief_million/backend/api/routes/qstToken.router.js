const qstToken = require('../controllers/question_token.controller')
const verifyTokenParticipant = require('../middleware/verifyTokenParticipant')
const router = require('express').Router();

router.route('/').get(verifyTokenParticipant, qstToken.getQuestionToken)
router.route('/post').post(verifyTokenParticipant, qstToken.postQstToken)


module.exports = router