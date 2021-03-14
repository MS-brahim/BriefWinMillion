const GRPController = require('../controllers/GRP_member.controller')
const verifyTokenParticipant = require('../middleware/verifyTokenParticipant');
const router = require('express').Router();

router.route('/').get( GRPController.getGrpMemebr)
router.route('/post').post( GRPController.postGrpMember)
router.route('/join/:id').put( GRPController.joiGroup)


module.exports = router

