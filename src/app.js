const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // Import the bcrypt library

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-database-url' with your actual database URL)
mongoose.connect('mongodb://localhost/movie_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexs: true,
});

// Define the User model (replace with your user schema)
const User = mongoose.model('User', {
  username: String,
  password: String, // Store hashed passwords securely, not plaintext
  // Add other user-related fields as needed
});

// Configure sessions and Passport.js for user authentication
app.use(
  session({
    secret: 'your-session-secret', // Replace with your own session secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport.js local strategy for user authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Implement your authentication logic here
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username' });

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Middlewares for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use route handlers (assuming you have these route files)
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const playlistRoutes = require('./routes/playlist');

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/playlists', playlistRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
