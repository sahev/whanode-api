const express = require('express')
const controller = require('../controllers/instance.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')
const { protectRoutes } = require('../../config/config');
const tokenCheck = require('../middlewares/tokenCheck');
const adminToken = require('../middlewares/adminToken');



const router = express.Router()
if (protectRoutes) {
 router.use(tokenCheck);
}
router.route('/init').post(adminToken,controller.init)
router.route('/editar').post(controller.editar)
router.route('/qr').get(keyVerify, controller.qr)
router.route('/qrbase64').get(keyVerify, controller.qrbase64)
router.route('/info').get(keyVerify, controller.info)
router.route('/restore').get(adminToken,controller.restore)
router.route('/restore').post(keyVerify,controller.restoreInstance)
router.route('/logout').post(keyVerify, loginVerify, controller.logout)
router.route('/delete').delete(keyVerify, controller.delete)
router.route('/list').get(adminToken,controller.list)
router.route('/deleteInactives').get(adminToken,controller.deleteInactives)
router.route('/deleteAll').get(adminToken,controller.deleteAll)
router.route('/getcode').post(keyVerify,controller.getcode)

module.exports = router
