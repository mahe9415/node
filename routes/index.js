const express = require('express');
const router = express.Router();
const storeController=require('../controllers/storeController.js')
const userController=require('../controllers/userController.js')
const {catchErrors} =require('../handlers/errorHandlers.js')
// Do work here
router.get('/',storeController.getStores)
router.get('/stores',storeController.getStores)

router.get('/add',storeController.addStore)
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
router.get('/register',userController.registerForm)


router.post('/register',
	userController.validateRegister,
	userController.register)


module.exports = router;
