const GRPController = require('../controllers/GRP_member.controller')
const verifyTokenParticipant = require('../middleware/verifyTokenParticipant');
const router = require('express').Router();

router.route('/').get( GRPController.getGrpMemebr)
router.route('/post').post(verifyTokenParticipant, GRPController.postGrpMember)
router.route('/join/:id').put(verifyTokenParticipant, GRPController.joiGroup)


module.exports = router

