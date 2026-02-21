// ------------------- REGISTER USER -------------------
function registerUser(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  // Check if email already exists
  if (users.find(u => u.email === user.email)) {
    alert("❌ Email already registered!");
    return false;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

// ------------------- LOGIN USER -------------------
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let foundUser = users.find(u => u.email === email && u.password === password);

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // Redirect based on role
    if (foundUser.role === "admin") {
      window.location = "admin.html";
    } else {
      window.location = "products.html";
    }

    return true;
  } else {
    alert("❌ Invalid Email or Password!");
    return false;
  }
}

// ------------------- LOGOUT USER -------------------
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location = "login.html";
}

// ------------------- CHECK LOGGED-IN USER -------------------
function checkLoggedIn() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location = "login.html";
  }
  return user;
}

// ------------------- ON LOGIN FORM -------------------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      loginUser(email, password);
    });
  }
});
