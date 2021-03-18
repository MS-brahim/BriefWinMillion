const router = require('express').Router();

const participantController = require('../controllers/participant.controller');
const verifyTokenParticipant = require('../middleware/verifyTokenParticipant');
const verifyTokenAdmin = require('..//middleware/verifyTokenAdmin')

router.route('/').get( participantController.getParticipant)
router.route('/SignUp').post(participantController.registerParticipant)
router.route('/login').post(participantController.loginParticipant)
router.route('/validateParticipant/:id').patch( participantController.validerParticipant)

// router.route('/update/:id').patch(participantController.updateParticipant)
// router.route('/delete/:id').delete(participantController.deleteParticipant)

module.exports = router;