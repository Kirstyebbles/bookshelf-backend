import { account } from "./appwrite.js";



const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

const loginScreen = document.getElementById("login-screen");
const profileScreen = document.getElementById("profile-screen");

const userName = document.getElementById("user-name");



async function handleLogin() {

  account.createOAuth2Session(
    "google",
    window.location.origin,
    window.location.origin
  );
}



async function handleLogout() {

  await account.deleteSession("current");

  renderLoginScreen();
}



async function getUser() {

  try {

    const user = await account.get();

    renderProfileScreen(user);

  } catch(error) {

    renderLoginScreen();
  }
}



function renderLoginScreen() {

  loginScreen.classList.remove("hidden");
  profileScreen.classList.add("hidden");
}



function renderProfileScreen(user) {

  userName.textContent = user.name;

  loginScreen.classList.add("hidden");
  profileScreen.classList.remove("hidden");
}



loginBtn.addEventListener("click", handleLogin);

logoutBtn.addEventListener("click", handleLogout);



getUser();
