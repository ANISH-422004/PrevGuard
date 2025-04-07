const router = require('express').Router();
const { authUser } = require('../middleWare/userMiddleware');
const vaultController = require('../controllers/vault.controller');

// Route to get all vaults for a user
router.get('/getall', authUser, vaultController.getVault);
router.post('/add', authUser, vaultController.addVault);
router.put('/update/:id', authUser, vaultController.updateVault);
router.delete('/delete/:id', authUser, vaultController.deleteVault);



module.exports = router;