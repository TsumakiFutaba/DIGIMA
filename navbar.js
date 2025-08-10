import { auth } from "./firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            
            let retries = 0;
            const waitForNavbarElements = setInterval(() => {
                if (document.getElementById("login-btn") && document.getElementById("profile-pic")) {
                    clearInterval(waitForNavbarElements);
                    checkUserStatus();
                } else if (retries > 10) {
                    clearInterval(waitForNavbarElements);
                    console.error("Navbar elements not found. Authentication check aborted.");
                }
                retries++;
            }, 500);
        })
        .catch(error => console.error("Error loading navbar:", error));
});

function checkUserStatus() {
    auth.onAuthStateChanged((user) => {
        const loginBtn = document.getElementById("login-btn");
        const signUpBtn = document.getElementById("signup-btn");
        const profilePic = document.getElementById("profile-pic");
        const signOutBtn = document.getElementById("sign-out-btn");

        if (user) {
            loginBtn.style.display = "none";
            signUpBtn.style.display = "none";
            profilePic.style.display = "inline-block";
            profilePic.src = user.photoURL;

            signOutBtn.addEventListener("click", () => {
                signOutUser();
            });

        } else {
            loginBtn.style.display = "inline-block";
            signUpBtn.style.display = "inline-block";
            profilePic.style.display = "none";
        }
    });
}



