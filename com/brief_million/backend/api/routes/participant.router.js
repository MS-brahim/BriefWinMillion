const router = require('express').Router();

const participantController = require('../controllers/participant.controller');
const verifyTokenParticipant = require('../validation/verifyTokenParticipant');
const verifyTokenAdmin = require('../validation/verifyTokenAdmin')

router.route('/').get(verifyTokenParticipant, participantController.getParticipant)
router.route('/SignUp').post(participantController.registerParticipant)
router.route('/login').post(participantController.loginParticipant)
router.route('/validateParticipant/:id').patch(verifyTokenAdmin, participantController.validerParticipant)

// router.route('/update/:id').patch(participantController.updateParticipant)
// router.route('/delete/:id').delete(participantController.deleteParticipant)

module.exports = router;