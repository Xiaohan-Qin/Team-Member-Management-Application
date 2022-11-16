const mysql = require('mysql');

// create mysql connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // use your own username here
  password: 'password',    // use your own password here
  database: 'TeamMemberManagementApplication'
});

dbConn.connect(function (error) {
  if (error) {
    throw error;
  }
  console.log('Database Connected Successfully');
})

module.exports = dbConn;