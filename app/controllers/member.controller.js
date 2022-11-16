const Member = require("../models/member.model");

// Fetch all team members
exports.getMemberList = (req, res) => {
  Member.getAllMembers((err, members) => {
    if (err) {
      res.send(err);
    }
    console.log('Members', members);
    res.send(members)
  });
};

// Add a new team member
exports.createNewMember = (req, res) => {
  const memberReqData = new Member(req.body);
  console.log('memberReqData', memberReqData);
  Member.createMember(memberReqData, (err, member) => {
    if (err) {
      res.send(err)
    } else {
      res.json({success: true, memberCreated: memberReqData})
    }
  })
};

// Update a member
exports.updateMember = (req, res) => {
  const memberReqData = new Member(req.body);
  console.log('memberReqData update', memberReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({success: false, message: 'Empty object. Nothing to update'});
  }
  else {
    Member.updateMember(req.params.id, memberReqData, (err, member) => {
      if (err) {
        res.send(err);
      }
      res.json({success: true, memberUpdated: memberReqData})
    })
  }
}

// delete a member
exports.deleteMember = (req, res) => {
  Member.deleteMember(req.params.id, (err, member) => {
    if (err) {
      res.send(err);
    } else {
      res.json({success: true, message: 'Member deleted successfully'})
    }
  })
}