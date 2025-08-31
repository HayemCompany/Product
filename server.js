const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const usersFile = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]', 'utf8');
}

// Handle form submission
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Read existing users
  let users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

  // Add new user
  users.push({ name, email, password });

  // Save back to file
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');

  res.send('Registration successful!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
