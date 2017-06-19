const express = require('express');
const router = express.Router();
const StoreController=require('../controllers/storeController.js')
const {catchErrors} =require('../handlers/errorHandlers.js')
// Do work here
router.get('/',StoreController.getStores)
router.get('/stores',StoreController.getStores)

router.get('/add',StoreController.addStore)
router.post('/add',catchErrors(StoreController.createStore))

router.get('/stores/:id/edit',catchErrors(StoreController.editStores))
router.post('/add/:id/',catchErrors(StoreController.updateStores))

module.exports = router;
