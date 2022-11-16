# Team Member Management Application 


## Description

* This REST API is a backend team-member management application. 
* It is built with **NodeJS**, **Express**, and **MySQL** database. 
* The application supports four operations: 
listing team members, adding a new team member, editing a team member, and deleting a team member.

## Getting started
### Installation
1. Clone the repository and open it in your editor. 
2. Run ```npm install``` in your console to install all the dependencies needed for this application.
3. Create your own **.env** file in the root of the project following **.env.example** file as an example. 
Fill in the following variables: NODE_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT for configuration.
4. Check the app/database/mysql_query.sql file and execute it in your Workbench to create the schema and tables.
5. Run ```npm start``` in your console to start the application.
If everything goes well, you should see something like this:<br>
    ```
    Server running on port ...
    Database connected successfully
    ```
6. And now we are ready to make the tests!


## Testing Endpoints with CURL Commands
My server is running on port 3000 so my all of my tests would reflect this port number.
### GET
* Get a list of all team members
  ```
  curl http://localhost:3000/api/members
  ```

### POST
* Inputs complete and valid 
  ```
   curl -X POST -H "Content-Type:application/json" \
   --data '{"firstName": "Hannah", "lastName": "Qin", "phone": "206-4256-866", "email": "HannahQ@outlook.com", "role": "regular"}' \
   http://localhost:3000/api/members
  ```
  Console output (success)
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100   260  100   142  100   118   2524   2097 --:--:-- --:--:-- --:--:--  4814{"success":true,"memberCreated":{"firstName":"Hannah","lastName":"Qin","phone":"206-4256-866","email":"HannahQ@outlook.com","role":"regular"}}
  ```

* Missing fields<br>
  e.g. create member without giving phone number
  ```
   curl -X POST -H "Content-Type:application/json" \
  --data '{"firstName": "Joe", "lastName": "Wu", "email": "JoeW@outlook.com", "role": "regular"}' \
  http://localhost:3000/api/members
  ```
  Console output (fail)
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100   160  100    74  100    86   9981  11599 --:--:-- --:--:-- --:--:-- 32000{"error":["Phone number must be a string","Phone number cannot be empty"]}

  ```

* Invalid value(s) <br>
e.g. Invalid email format + role not "admin" or "regular"
  ```
  curl -X POST -H "Content-Type:application/json" \
  --data '{"firstName": "Sharon", "lastName": "Zhang", "phone": "425-788-9099", "email": "SharonZ123", "role": "student"}' \
  http://localhost:3000/api/members
  ```
  
  Console output (fail)
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100   184  100    73  100   111   5385   8188 --:--:-- --:--:-- --:--:-- 15333{"error":["Invalid email format","Role must be either regular or admin"]}
  ```

### PUT
* Request body empty<br>
  ```
  curl -X PUT -H "Content-Type: application/json" \
  --data '{}' \
  http://localhost:3000/api/members/1
  ```

  Console output (fail)
  ```
  Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                               Dload  Upload   Total   Spent    Left  Speed
  100    63  100    61  100     2   6325    207 --:--:-- --:--:-- --:--:--  7875{"success":false,"message":"Empty object. Nothing to update"}
  ```

* Invalid values(s)<br>
  e.g. role is not "admin" or "regular"
  ```
  curl -X PUT -H "Content-Type: application/json" \
  --data '{"role": ""student"}' \
   http://localhost:3000/api/members/2
  ```
  Console output (fail)
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100    69  100    50  100    19    778    295 --:--:-- --:--:-- --:--:--  1095{"error":["Role must be either regular or admin"]}
  ```

* Valid value(s)
  ```
  curl -X PUT -H "Content-Type: application/json" \
  --data '{"firstName": "Zoe"}' \
   http://localhost:3000/api/members/3
  ```

  Console output (success)
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100    72  100    52  100    20   2625   1009 --:--:-- --:--:-- --:--:--  3789{"success":true,"memberUpdated":{"firstName":"Zoe"}}
  ```
  
### DELETE
* Delete team member with id 2
  ```
  curl -X DELETE http://localhost:3000/api/members/2
  ```
  
  Console output
  ```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  100    56  100    56    0     0   1974      0 --:--:-- --:--:-- --:--:--  2074{"success":true,"message":"Member deleted successfully"}
  ```

