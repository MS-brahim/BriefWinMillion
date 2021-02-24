const adminController = require('../controllers/admin.controller');
const verifyTokenAdmin = require('../validation/verifyTokenAdmin');
const router = require('express').Router();

router.route('/').get(verifyTokenAdmin, adminController.getAdmin)
router.route('/login').post(adminController.loginAdmin)
router.route('/post').post(verifyTokenAdmin, adminController.postAdmin)

// router.route('/update/:id').patch(verifyTokenAdmin, adminController.updateAdmin)
// router.route('/delete/:id').delete(verifyTokenAdmin, adminController.deleteAdmin)

module.exports = router;