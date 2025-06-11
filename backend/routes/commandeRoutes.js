// routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');


router.post('/', commandeController.createCommande);
router.get('/', commandeController.getAllCommandes);
router.delete('/:id', commandeController.deleteCommande);
module.exports = router;
