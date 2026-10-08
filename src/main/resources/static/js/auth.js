// ================================
// LOGIN CHECK
// ================================

function checkLogin() {

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}


// ================================
// LOGIN
// ================================

function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginError");

    if (email === "admin@campusone.com" && password === "admin123") {

        sessionStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";

    } else {

        message.textContent = "Invalid email or password.";

    }
}


// ================================
// SIGN OUT
// ================================

function logout() {

    sessionStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}