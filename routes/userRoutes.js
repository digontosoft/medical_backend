const express = require("express");
const router = express.Router();
const { 
  getUsers, 
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// Routes
router.route('/users')
  .get(getUsers)

router.route('/user/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
