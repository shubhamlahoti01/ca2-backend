const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const students = require('./students');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send(`
    <form method="POST" action="/register">
      <input type="text" name="name" placeholder="Name"><br>
      <input type="email" name="email" placeholder="Email"><br>
      <input type="number" name="mobile" placeholder="Mobile"><br>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', async (req, res) => {
  const data = {
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
  };
  try {
    const user = await new students({ ...data }).save();
    console.log(user);
    return res.send('Success');
  } catch (error) {
    console.log(error);
    return res.send('error');
  }
});

app.listen(3000, async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb://127.0.0.1:27017/student_registration'
    );
    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
  console.log('server running on port 3000');
});
