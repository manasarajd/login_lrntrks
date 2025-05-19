// Simple in-memory "database" for demo
const users = [
  { username: 'admin', password: 'password', email: 'admin@example.com' }
];

// Password strength check
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

// Toggle forms
document.getElementById('showLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  // Clear errors
  document.getElementById('registerError').style.display = 'none';
  document.getElementById('loginError').style.display = 'none';
};
document.getElementById('showRegister').onclick = function(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registrationForm').style.display = 'block';
  // Clear errors
  document.getElementById('registerError').style.display = 'none';
  document.getElementById('loginError').style.display = 'none';
};

// Registration validation
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorDiv = document.getElementById('registerError');

  errorDiv.style.display = 'none';

  if (!username || !email || !password || !confirmPassword) {
    errorDiv.textContent = 'Please fill in all fields.';
    errorDiv.style.display = 'block';
    return;
  }

  // Email format validation
  const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailPattern.test(email)) {
    errorDiv.textContent = 'Please enter a valid email address.';
    errorDiv.style.display = 'block';
    return;
  }

  // Password match
  if (password !== confirmPassword) {
    errorDiv.textContent = 'Passwords do not match.';
    errorDiv.style.display = 'block';
    return;
  }

  // Password strength
  if (getPasswordStrength(password) < 3) {
    errorDiv.textContent = 'Password should be at least 8 characters, include a number, an uppercase letter, and a special character.';
    errorDiv.style.display = 'block';
    return;
  }

  // Check if username already exists
  if (users.some(u => u.username === username)) {
    errorDiv.textContent = 'Username already exists.';
    errorDiv.style.display = 'block';
    return;
  }

  // Register user
  users.push({ username, password, email });
  alert('Registration successful! You can now log in.');
  document.getElementById('registrationForm').reset();
  document.getElementById('passwordStrength').value = 0;
  // Switch to login form
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Password strength meter
document.getElementById('regPassword').addEventListener('input', function() {
  const strength = getPasswordStrength(this.value);
  document.getElementById('passwordStrength').value = strength;
});

// Login validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');

  errorDiv.style.display = 'none';

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert('Login successful!');
    document.getElementById('loginForm').reset();
  } else {
    errorDiv.textContent = 'Invalid username or password.';
    errorDiv.style.display = 'block';
  }
});
