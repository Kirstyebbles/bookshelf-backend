import { account } from "./appwrite.js";

const loginStatus = document.getElementById("login-status");

const loginBtn = document.getElementById("login-btn");

const logoutBtn = document.getElementById("logout-btn");

/* LOGIN */

function handleLogin() {

    account.createOAuth2Session(
        "google",
        "https://trackyourbooks.autos",
        "https://trackyourbooks.autos"
    );
}

/* LOGOUT */

async function handleLogout() {

    await account.deleteSession("current");

    location.reload();
}

/* CHECK USER */

async function getUser() {

    try {

        await account.get();

        loginStatus.textContent = "Logged in successfully ✅";

        loginBtn.style.display = "none";

        logoutBtn.style.display = "block";

    } catch(error) {

        loginStatus.textContent = "";

        loginBtn.style.display = "block";

        logoutBtn.style.display = "none";
    }
}

/* EVENTS */

loginBtn.addEventListener("click", handleLogin);

logoutBtn.addEventListener("click", handleLogout);

/* START */

getUser();

       

       