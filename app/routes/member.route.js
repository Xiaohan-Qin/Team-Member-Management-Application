const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const memberController = require('../controllers/member.controller');

// get all members
router.get('/', memberController.getMemberList);

// create a new member
router.post(
    '/',
    [
        check("memberId")
          .isEmpty()
          .withMessage("Setting up memberId is not allowed. Please remove this field"),
        check("firstName")
          .isString()
          .withMessage("First name must be a string")
          .notEmpty()
          .withMessage("First name cannot be empty"),
        check("lastName")
          .isString()
          .withMessage("Last name must be a string")
          .notEmpty()
          .withMessage("Last name cannot be empty"),
        check("phone")
          .isString()
          .withMessage("Phone number must be a string")
          .notEmpty()
          .withMessage("Phone number cannot be empty"),
        check("email")
          .isString()
          .withMessage("Email must be a string")
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

// update a member
router.put('/:id',
    [
      check("firstName")
      .isString()
      .withMessage("First name must be a string"),
      check("lastName")
      .isString()
      .withMessage("Last name must be a string"),
      check("phone")
      .isString()
      .withMessage("Phone number must be a string"),
      check("email")
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .withMessage("Invalid email format"),
      check("role")
      .isIn(["regular", "admin"])
      .withMessage("Role must be either regular or admin")
    ],
    memberController.updateMember);

// delete a member
router.delete('/:id', memberController.deleteMember);

module.exports = router;