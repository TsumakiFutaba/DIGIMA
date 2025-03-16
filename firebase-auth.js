import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnbjB7QqmbuyxaKtBOiEI5Do4rsKmHWrY",
    authDomain: "digima-cb2fc.firebaseapp.com",
    projectId: "digima-cb2fc",
    storageBucket: "digima-cb2fc.firebasestorage.app",
    messagingSenderId: "498606156423",
    appId: "1:498606156423:web:dd642f8202a85bc473e622",
    measurementId: "G-1E2QX3R9NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };

// Sign in function
window.signIn = function () {
    signInWithPopup(auth, provider)
        .then(result => {
            alert(`Logged in as ${result.user.displayName}`);
            updateUI(result.user);
        })
        .catch(error => console.error("Sign-in error:", error));
};

// Sign out function
window.signOutUser = function () {
    signOut(auth)
        .then(() => {
            alert("Signed out successfully");
            updateUI(null);
        })
        .catch(error => console.error("Sign-out error:", error));
};

function updateUI(user) {
    const loginBtn = document.getElementById("login-btn");
    const signUpBtn = document.getElementById("signup-btn");
    const userProfile = document.getElementById("user-profile");

    if (user) {
        loginBtn.style.display = "none";
        signUpBtn.style.display = "none";

        userProfile.innerHTML = `
            <img id="profile-pic" src="${user.photoURL}" alt="Profile" class="rounded-circle" width="40" height="40" 
                style="cursor: pointer;" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-html="true">
        `;

        setTimeout(() => {
            const profilePic = document.getElementById("profile-pic");
            profilePic.setAttribute("data-bs-content", `
                <div class="text-center">
                    <strong>${user.displayName}</strong><br>
                    <small>${user.email}</small><br>
                    <button class="btn btn-danger btn-sm mt-2" id="sign-out-btn">Sign Out</button>
                </div>
            `);

            // Listen for when the popover is shown and attach the sign-out event
            profilePic.addEventListener("shown.bs.popover", () => {
                const signOutBtn = document.getElementById("sign-out-btn");
                if (signOutBtn) {
                    signOutBtn.addEventListener("click", signOutUser);
                }
            });

        }, 200);
    } else {
        // Show login & signup buttons
        loginBtn.style.display = "inline-block";
        signUpBtn.style.display = "inline-block";

        // Hide profile section
        userProfile.innerHTML = "";
    }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});
