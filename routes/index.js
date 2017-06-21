const express = require('express');
const router = express.Router();
const storeController=require('../controllers/storeController.js')
const userController=require('../controllers/userController.js')
const authController=require('../controllers/authController.js')
const {catchErrors} =require('../handlers/errorHandlers.js')
// Do work here
router.get('/',storeController.getStores)
router.get('/stores',storeController.getStores)

router.get('/add',authController.isLoggedIn,storeController.addStore)
router.post('/add',storeController.upload,
					catchErrors(storeController.resize),
					catchErrors(storeController.createStore))

router.post('/add/:id/',storeController.upload,
					catchErrors(storeController.resize),
					catchErrors(storeController.updateStores))

router.get('/stores/:id/edit',catchErrors(storeController.editStores))

router.get('/stores/:slug',catchErrors(storeController.getStore))

router.get('/tags',storeController.getTags)
router.get('/tags/:tag',storeController.getTags)


router.get('/login',userController.loginForm)
router.post('/login',authController.login)
router.get('/register',userController.registerForm)


router.post('/register',
	userController.validateRegister,
	userController.register
	,authController.login)


router.get('/logout',authController.logout)
router.post('/account/forgot',authController.forgot)

router.get('/account',userController.account)
router.post('/account',userController.updateAccount)


router.get('/account/reset/:token',authController.reset)
router.post('/account/reset/:token',authController.confrimedPassword,
									authController.update)	

module.exports = router;
