const express = require("express");
const memberRoutes = require('./app/routes/member.route');

// create express app
const app = express();

// setup server port
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// import router middleware
app.use('/api/members', memberRoutes);

// define root route
app.get("/", (req, res) => {
  res.send("Welcome to Xiaohan's team member management application :D")
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});