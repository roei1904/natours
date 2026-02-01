const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/userController');
const authcontroller = require('../controllers/authController');

router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);
router.get('/logout', authcontroller.logout);

router.post('/forgetPassword', authcontroller.forgotPassword);
router.patch('/resetPassword/:token', authcontroller.resetPassword);

router.use(authcontroller.protect);

router.patch('/updateMyPassword', authcontroller.updatePassword);

router.get('/me', usercontroller.getMe, usercontroller.getUserById);
router.patch('/updateMe',usercontroller.uploadUserPhoto,usercontroller.resizeUserPhoto, usercontroller.updateMe);
router.delete('/deleteMe',usercontroller.deleteMe);

router.use(authcontroller.restrictTo('admin'));

router.route('/').get(usercontroller.getAllUsers)

router
  .route('/:id')
  .get(usercontroller.getUserById)
  .patch(usercontroller.updateUser)
  .delete(usercontroller.deleteUser);

module.exports = router;
