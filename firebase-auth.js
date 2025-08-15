import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCnbjB7QqmbuyxaKtBOiEI5Do4rsKmHWrY",
    authDomain: "digima-cb2fc.firebaseapp.com",
    projectId: "digima-cb2fc",
    storageBucket: "digima-cb2fc.firebasestorage.app",
    messagingSenderId: "498606156423",
    appId: "1:498606156423:web:dd642f8202a85bc473e622",
    measurementId: "G-1E2QX3R9NH"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign out
function signOutUser() {
    signOut(auth)
        .then(() => alert("Signed out successfully"))
        .catch(error => console.error("Sign-out error:", error));
}

// Update navbar UI
function updateUI(user) {
    const loginBtn = document.getElementById("login-btn");
    const signUpBtn = document.getElementById("signup-btn");
    const profilePic = document.getElementById("profile-pic");
    const signOutBtn = document.getElementById("sign-out-btn");

    if (!loginBtn || !signUpBtn || !profilePic) {
        console.warn("Navbar elements not found yet.");
        return;
    }

    if (user) {
        loginBtn.style.display = "none";
        signUpBtn.style.display = "none";
        profilePic.style.display = "inline-block";
        profilePic.src = user.photoURL || "assets/default-avatar.png";

        if (signOutBtn) {
            signOutBtn.addEventListener("click", signOutUser);
        }
    } else {
        loginBtn.style.display = "inline-block";
        signUpBtn.style.display = "inline-block";
        profilePic.style.display = "none";
    }
}

// Called after navbar is loaded
window.initializeAuthUI = function () {
    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });
};
