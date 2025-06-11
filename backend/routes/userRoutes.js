const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  generateFakeUsers,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/faker', generateFakeUsers);
router.delete('/:id', deleteUser);

module.exports = router;
