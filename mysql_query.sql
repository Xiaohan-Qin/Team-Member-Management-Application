CREATE SCHEMA IF NOT EXISTS TeamMemberManagementApplication;
USE TeamMemberManagementApplication;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

DROP TABLE IF EXISTS TeamMembers;

CREATE TABLE TeamMembers (
	memberId INT AUTO_INCREMENT,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	phone  VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL,
    role ENUM("admin", "regular"),
	CONSTRAINT pk_TeamMembers_memberId PRIMARY KEY (MemberId)
);

-- insert initial data into date base
INSERT INTO TeamMembers (firstName, lastName, Phone, email, role) 
VALUES("Peter", "Dong", "206-443-7080", "peterD@gmail.com", "regular");

INSERT INTO TeamMembers (firstName, lastName, phone, email, role) 
VALUES("Hazel", "Lee", "206-579-8804", "HazelL@gmail.com", "admin");