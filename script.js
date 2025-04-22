const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const successMsg = document.querySelector('.success-msg');

function showError(input, message) {
  const group = input.parentElement;
  const error = group.querySelector('small');
  error.textContent = message;
}

function clearError(input) {
  const group = input.parentElement;
  const error = group.querySelector('small');
  error.textContent = '';
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    valid = false;
  } else {
    clearError(nameInput);
  }

  // Email
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, 'Enter a valid email');
    valid = false;
  } else {
    clearError(emailInput);
  }

  // Phone
  if (!validatePhone(phoneInput.value)) {
    showError(phoneInput, 'Enter a 10-digit number');
    valid = false;
  } else {
    clearError(phoneInput);
  }

  // Password
  if (passwordInput.value.length < 6) {
    showError(passwordInput, 'Password must be at least 6 characters');
    valid = false;
  } else {
    clearError(passwordInput);
  }

  if (valid) {
    successMsg.textContent = 'Form submitted successfully!';
    form.reset();
  } else {
    successMsg.textContent = '';
  }
});

// Real-time blur validation
[nameInput, emailInput, phoneInput, passwordInput].forEach(input => {
  input.addEventListener('blur', () => {
    form.dispatchEvent(new Event('submit'));
  });
});
