const User = require("../models/User");
const Profile = require("../models/Profile");
const validateProfileInput = require("../validation/profileValidation");
const validateExperienceInput = require("../validation/experienceValidation");
const validateEducationInput = require("../validation//educationValidation");

// Get Profile
exports.getProfile = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user._id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// Get All Profiles
exports.getAllProfiles = (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There are no Profiles";
        return res.status(404).json({ errors });
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
};

//Get Profile by Handle
exports.getProfileByHandle = (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

//Get Profile by ID
exports.getProfileByID = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
};

// Create Profile
exports.postProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user._id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(",");
  }
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user._id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "That handle already exist";
          res.status(400).json(errors);
        }
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

// Post Experience
exports.postExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user._id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    profile.experience.unshift(newExp);
    profile.save().then(profile => res.json(profile));
  });
};

// Post Education
exports.postEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user._id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    profile.education.unshift(newEdu);
    profile.save().then(profile => res.json(profile));
  });
};

// Delete Experience
exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    // const removeIndex = profile.experience
    //   .map(item => item._id)
    //   .indexOf(req.params.exp_id);
    // profile.experience.splice(removeIndex, 1);

    profile.experience.id(req.params.exp_id).remove();

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  });
};

// Delete Education
exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    // const removeIndex = profile.education
    //   .map(item => item._id)
    //   .indexOf(req.params.edu_id);
    // profile.education.splice(removeIndex, 1);

    profile.education.id(req.params.edu_id).remove();

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  });
};

// Delete User and Profile
exports.deleteUser = (req, res) => {
  Profile.findOneAndRemove({ user: req.user._id }).then(() => {
    User.findOneAndRemove({ _id: req.user._id }).then(() =>
      res.json({ success: true })
    );
  });
};
