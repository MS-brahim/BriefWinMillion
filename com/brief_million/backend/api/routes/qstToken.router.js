const qstToken = require('../controllers/question_token.controller')
const verifyTokenParticipant = require('../middleware/verifyTokenParticipant')
const router = require('express').Router();

router.route('/').get( qstToken.getQuestionToken)
router.route('/post').post( qstToken.postQstToken)


module.exports = router