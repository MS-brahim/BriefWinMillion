const giftController = require('../controllers/gifts.controller')
const router = require('express').Router();

router.route('/').get(giftController.getGifts)
router.route('/post').post(giftController.postGifts)

module.exports = router

