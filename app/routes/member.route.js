const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member.controller');

// get all employees
router.get('/', memberController.getMemberList);

// create new employee
router.post('/', memberController.createNewMember);

// update employee
router.put('/:id', memberController.updateMember);

// delete employee
router.delete('/:id', memberController.deleteMember);

module.exports = router;