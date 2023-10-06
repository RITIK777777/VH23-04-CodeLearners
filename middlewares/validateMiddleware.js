// middlewares/validateMiddleware.js
const { check, validationResult } = require("express-validator");

const validateRegisterInput = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and confirm password must match");
    }
    return true;
  }),
];

const validateLoginInput = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

const validateScholarshipInput = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  // Add more validation rules for scholarship data
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateScholarshipInput,
  handleValidationErrors,
};
