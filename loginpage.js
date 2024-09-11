document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("mail");
  const passwordInput = document.getElementById("pass");
  const repasswordInput = document.getElementById("repass");
  const emailFeedback = document.getElementById("mailfeed");
  const passwordFeedback = document.getElementById("passfeed");
  const repasswordFeedback = document.getElementById("repassfeed");
  const numberInput = document.getElementById("phnumber");
  const numberFeedback = document.getElementById("phonefeed");
  const btn = document.querySelector("button");

  function validateEmail(input) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(input);
  }

  function validateNumber(input) {
    const numberPattern = /^\+?[1-9]\d{1,14}$/;
    return numberPattern.test(input);
  }

  function validatePassword(input) {
    const symb = /[!@#$%^&*(),.?":{}|<>]/;
    const dig = /\d/;
    const big = /[A-Z]/;
    const small = /[a-z]/;

    if (input.length < 8) {
      return 5;
    } else if (!symb.test(input)) {
      return 0;
    } else if (!dig.test(input)) {
      return 2;
    } else if (!big.test(input)) {
      return 3;
    } else if (!small.test(input)) {
      return 4;
    } else {
      return 1;
    }
  }

  emailInput.addEventListener("input", function () {
    if (validateEmail(emailInput.value)) {
      emailFeedback.textContent = "";
    } else {
      emailFeedback.textContent = "* Please enter a correct email address";
    }
    checkAvailability();
  });

  numberInput.addEventListener("blur", function () {
    if (validateNumber(numberInput.value)) {
      numberFeedback.textContent = "";
    } else {
      numberFeedback.textContent = "* Please enter a valid mobile number";
    }
    checkAvailability();
  });

  passwordInput.addEventListener("input", function () {
    const passwordValidationResult = validatePassword(passwordInput.value);
    if (passwordValidationResult === 1) {
      passwordFeedback.textContent = "";
    } else if (passwordValidationResult === 0) {
      passwordFeedback.textContent = "* Password must contain at least one special character.";
    } else if (passwordValidationResult === 2) {
      passwordFeedback.textContent = "* Password must contain at least one digit.";
    } else if (passwordValidationResult === 3) {
      passwordFeedback.textContent = "* Password must contain at least one uppercase letter.";
    } else if (passwordValidationResult === 4) {
      passwordFeedback.textContent = "* Password must contain at least one lowercase letter.";
    } else if (passwordValidationResult === 5) {
      passwordFeedback.textContent = "* Password must be at least 8 characters long.";
    }
    checkAvailability();
  });

  repasswordInput.addEventListener("input", function () {
    if (repasswordInput.value !== passwordInput.value) {
      repasswordFeedback.textContent = "* Passwords do not match.";
    } else {
      repasswordFeedback.textContent = "";
    }
    checkAvailability();
  });

  function checkAvailability() {
    const isEmailValid = validateEmail(emailInput.value);
    const isNumberValid = validateNumber(numberInput.value);
    const isPasswordValid = validatePassword(passwordInput.value) === 1;
    const doPasswordsMatch = repasswordInput.value === passwordInput.value;

    btn.disabled = !(isEmailValid && isNumberValid && isPasswordValid && doPasswordsMatch);
  }

  checkAvailability();
});