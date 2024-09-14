const express = require('express')
const controller = require('../controllers/message.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')
const multer = require('multer')


const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, inMemory: true }).single('file')
const { protectRoutes } = require('../../config/config');
const tokenCheck = require('../middlewares/tokenCheck');

if (protectRoutes) {
  router.use(tokenCheck);
}

router.route('/text').post(keyVerify, loginVerify, controller.Text)
router.route('/image').post(keyVerify, loginVerify, upload, controller.Image)
router.route('/sendurlfile').post(keyVerify, loginVerify, upload, controller.sendurlfile)
router.route('/sendbase64file').post(keyVerify, loginVerify, upload, controller.sendbase64file)
router.route('/imagefile').post(keyVerify, loginVerify, upload, controller.imageFile)
router.route('/audiofile').post(keyVerify, loginVerify, upload, controller.audioFile)
router.route('/video').post(keyVerify, loginVerify, upload, controller.Video)
router.route('/audio').post(keyVerify, loginVerify, upload, controller.Audio)
router.route('/doc').post(keyVerify, loginVerify, upload, controller.Document)
router.route('/mediaurl').post(keyVerify, loginVerify, controller.Mediaurl)
router.route('/button').post(keyVerify, loginVerify, controller.Button)
router.route('/contact').post(keyVerify, loginVerify, controller.Contact)
router.route('/list').post(keyVerify, loginVerify, controller.List)
router.route('/setstatus').post(keyVerify, loginVerify, controller.SetStatus)
router
    .route('/mediabutton')
    .post(keyVerify, loginVerify, controller.MediaButton)
router.route("/read").post(keyVerify, loginVerify, controller.Read)
router.route("/react").post(keyVerify, loginVerify, controller.React)

module.exports = router
