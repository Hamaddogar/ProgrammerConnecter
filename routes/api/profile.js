const express = require("express");
const passport = require("passport");

require("../../config/passport")(passport);
const profileController = require("../../controllers/profile");

const router = express.Router();

// get profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

// create profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.postProfile
);

// get profile buy handle
router.get("/handle/:handle", profileController.getProfileByHandle);

// get profile buy ID
router.get("/user/:user_id", profileController.getProfileByID);

// Get All Profiles
router.get("/all", profileController.getAllProfiles);

// Post Experience
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.postExperience
);

// Post Education
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.postEducation
);

// Delete Experience
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);

// Delete Education
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);

// Delete User and Profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteUser
);

module.exports = router;
