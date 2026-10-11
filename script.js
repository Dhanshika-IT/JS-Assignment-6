// Get HTML elements
const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

// Reusable function to show a page
const showPage = (page) => {
registerPage.classList.add("hidden");
loginPage.classList.add("hidden");
dashboardPage.classList.add("hidden");

page.classList.remove("hidden");

};

// Reusable function to display a message
const displayMessage = (element, message, color) => {
element.textContent = message;
element.style.color = color;

return message;

};

// Function to validate registration fields
const validateRegistration = (name, email, password, confirmPassword) => {
if (!name.trim() || !email.trim() || !password || !confirmPassword) {
return "All fields are required.";
}

if (name.trim().length < 3) {
    return "Name must contain at least 3 characters.";
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Enter a valid email address.";
}

if (password.length < 6) {
    return "Password must contain at least 6 characters.";
}

if (password !== confirmPassword) {
    return "Passwords do not match.";
}

return "";

};

// Function to validate login fields
const validateLogin = (email, password) => {
if (!email.trim() || !password) {
return "Please fill in all fields.";
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Enter a valid email address.";
}

return "";

};

// Function to save user information
const saveUser = (name, email, password) => {
const user = {
name: name.trim(),
email: email.trim().toLowerCase(),
password: password
};

localStorage.setItem("registeredUser", JSON.stringify(user));

return user;

};

// Function to check login details
const checkLogin = (email, password) => {
const savedData = localStorage.getItem("registeredUser");

if (!savedData) {
    return false;
}

const user = JSON.parse(savedData);

return (
    user.email === email.trim().toLowerCase() &&
    user.password === password
);

};

// Show Login page
document.getElementById("showLogin").addEventListener("click", (event) => {
event.preventDefault();

registerMessage.textContent = "";
loginMessage.textContent = "";

showPage(loginPage);

});

// Show Register page
document.getElementById("showRegister").addEventListener("click", (event) => {
event.preventDefault();

registerMessage.textContent = "";
loginMessage.textContent = "";

showPage(registerPage);

});

// Register form submission
registerForm.addEventListener("submit", (event) => {
event.preventDefault();

const name = document.getElementById("regName").value;
const email = document.getElementById("regEmail").value;
const password = document.getElementById("regPassword").value;
const confirmPassword = document.getElementById("confirmPassword").value;

const error = validateRegistration(
    name,
    email,
    password,
    confirmPassword
);

if (error) {
    displayMessage(registerMessage, error, "red");
    return;
}

saveUser(name, email, password);

registerForm.reset();

displayMessage(
    registerMessage,
    "Account created successfully! Please login.",
    "green"
);

loginMessage.textContent = "";
showPage(loginPage);

document.getElementById("loginEmail").value = email.trim();

});

// Login form submission
loginForm.addEventListener("submit", (event) => {
event.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

const error = validateLogin(email, password);

if (error) {
    displayMessage(loginMessage, error, "red");
    return;
}

if (checkLogin(email, password)) {
    const user = JSON.parse(
        localStorage.getItem("registeredUser")
    );

    document.getElementById("welcomeMessage").textContent =
        `Welcome, ${user.name}!`;

    loginMessage.textContent = "";

    loginForm.reset();

    showPage(dashboardPage);
} else {
    displayMessage(
        loginMessage,
        "Invalid email or password. Please register first if you don't have an account.",
        "red"
    );
}

});

// Logout button
document.getElementById("logoutButton").addEventListener("click", () => {
showPage(loginPage);

loginMessage.textContent = "You have logged out successfully.";
loginMessage.style.color = "green";

});