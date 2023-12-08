const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');
// const session = require('express-session');

const app = express();
// const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
.connect("mongodb://127.0.0.1:27017/practise")
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.log(err));


// // Middleware
// app.use(express.json());
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    tyep: String,}
});

const User = mongoose.model('User', userSchema);

// // Routes
app.post('/register', async (req, res) => {

  const body = req.body;

  if (!body.username) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username',
    });
  }

  if (!body.password) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a password',
    });
  }

  const result = await User.create({
    userName: body.user_name,
    password: body.pass_word,
  });

  console.log(result);

  return res.status(201).json({ msg: 'User created successfully!' });
});
  // try {
  //   const { username, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const newUser = new User({ username, password: hashedPassword });
  //   await newUser.save();

  //   res.status(201).send('User registered successfully!');
  // } catch (error) {
  //   res.status(500).send('Error registering user.');
  // }
// });

// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       res.status(401).send('Invalid credentials');
//       return;
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    
//     // Store token in session
//     req.session.token = token;

//     res.status(200).send('Login successful!');
//   } catch (error) {
//     res.status(500).send('Error logging in.');
//   }
// });

// app.get('/logout', (req, res) => {
//   // Destroy session and log user out
//   req.session.destroy();
//   res.status(200).send('Logged out successfully!');
// });

// app.get('/profile', (req, res) => {
//   // Check if user is authenticated using the token stored in the session
//   if (req.session.token) {
//     res.status(200).send('Welcome to your profile!');
//   } else {
//     res.status(401).send('Unauthorized. Please log in.');
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });