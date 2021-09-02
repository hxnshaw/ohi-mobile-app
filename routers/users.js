const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutAll,
} = require("../controllers/users");

const router = new express.Router();

router.route("/").post(createUser).get(auth, authorize("admin"), getAllUsers);

router.route("/login").post(loginUser);

router.route("/logout").post(auth, logoutUser);

router.route("/logoutAll").post(auth, logoutAll);

router
  .route("/me")
  .get(auth, authorize("admin"), getUser)
  .patch(auth, updateUser)
  .delete(auth, authorize("admin"), deleteUser);

module.exports = router;
