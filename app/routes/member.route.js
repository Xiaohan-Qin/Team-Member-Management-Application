const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const memberController = require('../controllers/member.controller');

// get all members
router.get('/', memberController.getMemberList);

// validate request body and create a new member
router.post(
    '/',
    [
        check("memberId")
          .isEmpty()
          .withMessage("Setting up memberId is not allowed. Please remove this field"),
        check("firstName")
          .notEmpty()
          .withMessage("First name cannot be empty"),
        check("lastName")
          .notEmpty()
          .withMessage("Last name cannot be empty"),
        check("phone")
          .notEmpty()
          .withMessage("Phone number cannot be empty"),
        check("email")
          .isEmail()
          .withMessage("Invalid email format")
          .notEmpty()
          .withMessage("Email cannot be empty"),
        check("role")
          .isIn(["regular", "admin"])
          .withMessage("Role must be either regular or admin")
          .notEmpty()
          .withMessage("Role cannot be empty"),
    ],
    (req, res, next) => {
      const error = validationResult(req).formatWith(({ msg }) => msg);
      const hasError = !error.isEmpty();
      if (hasError) {
        res.status(400).json({ error: error.array() });
      } else {
        next();
      }
    },
    memberController.createNewMember);

// validate request body and update a member
router.put('/:id',
    [
      check("firstName")
      .optional(),
      check("lastName")
      .optional(),
      check("phone")
      .optional(),
      check("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format"),
      check("role")
      .optional()
      .isIn(["regular", "admin"])
      .withMessage("Role must be either regular or admin")
    ],
    (req, res, next) => {
      const error = validationResult(req).formatWith(({ msg }) => msg);
      const hasError = !error.isEmpty();
      if (hasError) {
        res.status(400).json({ error: error.array() });
      } else {
        next();
      }
    },
    memberController.updateMember);

// delete a member
router.delete('/:id', memberController.deleteMember);

module.exports = router;