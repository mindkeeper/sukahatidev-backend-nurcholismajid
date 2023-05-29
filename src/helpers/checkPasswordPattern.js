function checkPasswordPattern(password) {
  // Check if the password meets the requirements
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)/;
  if (password.length < 6 || password.length > 20) {
    return [false, "Password length must be between 6 and 20 characters"];
  }
  if (!regex.test(password)) {
    return [false, "Password must contain at least one letter and one number"];
  }
  return [true, "Password is valid"];
}

module.exports = checkPasswordPattern;
