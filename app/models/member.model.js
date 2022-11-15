const dbConn = require('../../config/db.config');

// constructor
const Member = function (member) {
  // this.memberId = member.memberId;
  this.firstName = member.firstName;
  this.lastName = member.lastName;
  this.phone = member.phone;
  this.email = member.email;
  this.role = member.role;
};

// get all employees
Member.getAllMembers = (result) => {
  dbConn.query('SELECT * FROM TeamMembers;', (err, res) => {
    if (err) {
      console.log('Error while fetching members', err);
      result(null, err);
    } else {
      console.log('Members fetched successfully');
      result(null, res);
    }
  })
}

// create new employee
Member.createMember = (memberReqData, result) => {
  dbConn.query('INSERT INTO TeamMembers SET ?;', memberReqData, (err, res) => {
    if (err) {
      console.log('Error while inserting data');
      result(null, err);
    } else {
      console.log('Member created successfully');
      result(null, res)
    }
  })
}

// update employee by id
Member.updateMember = (id, memberReqData, result) => {
  // filter undefined fields
  let update = Object.fromEntries(Object.entries(memberReqData).filter(([_, v]) => v != null));
  const query = "Update TeamMembers SET " + Object.keys(update).map(
      key => `${key} = ?`).join(", ") + " WHERE memberId = ?";
  const parameters = [...Object.values(update), id];
  dbConn.query(query, parameters, (err, res) => {
    if (err) {
      console.log('Error while updating the member');
      result(null, err);
    } else {
      console.log("Member updated successfully");
      result(null, res);
    }
  })
}

// remove a team member
Member.deleteMember = (id, result) => {
  dbConn.query("DELETE FROM TeamMembers WHERE memberId = ?", id, (err, res) => {
    if (err) {
      console.log("Error while deleting the member");
      result(null, err);
    } else {
      console.log("Member deleted successfully");
      result(null, res);
    }
  });
}

module.exports = Member;