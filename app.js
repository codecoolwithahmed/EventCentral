import {
  auth,
  onAuthStateChanged,
  signOut,
  getDocs,
  getDoc,
  doc,
  collection,
  db,
} from "./firebase/firebase.js";

let loginprofile = document.getElementById("loginprofile");
let eventsBox = document.getElementById("events");
let loginbutton = document.getElementById("loginbutton");
let profileicon = document.getElementById("profileicon");
let name = document.getElementById("name");
let username = document.getElementById("username");

// Authentication and profile setup
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    loginbutton.style.display = "none";
    profileicon.style.display = "block";

    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const info = docSnap.data();
      loginprofile.src = info.profilePhotoInput;
      name.innerText = info.name;
      username.innerText = "@" +  info.username;

      // Logout
      let logout = document.getElementById("logout");
      logout.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            new Noty({
              text: "Signed out!",
              type: "success",
              layout: "topRight",
              timeout: 3000,
            }).show();
            loginbutton.style.display = "block";
            profileicon.style.display = "none";
          })
          .catch((error) => {
            new Noty({
              text: "Error signing out!",
              type: "error",
              layout: "topRight",
              timeout: 3000,
            }).show();
            loginbutton.style.display = "none";
            profileicon.style.display = "block";
          });
      });
    } else {
      new Noty({
        text: "No Document Found!",
        type: "info",
        layout: "topRight",
        timeout: 3000,
      }).show();
    }
  } else {
    loginprofile.style.display = "none";
    loginbutton.style.display = "block";
  }
});

// Displaying events
async function displayEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    eventsBox.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const databox = doc.data();
      const {
        createEventByName,
        createEventByUserName,
        createEventDate,
        createEventDescription,
        createEventImage,
        createEventLocation,
        createEventTime,
        createEventTitle,
        profilePhotoInput,
      } = databox;

      const profilePhoto =
        profilePhotoInput ||
        "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

      // Displaying events in HTML
      const card = `
        <div class="event_card">
          <div class="upparpart">
            <img alt="User Profile" src="${profilePhoto}" class="userprofile"/>
            <div class="cardusername">
              <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">${createEventByName || "Anonymous"}</h4>
              <p class="self-center text-sm whitespace-nowrap dark:text-white">@${createEventByUserName || "unknown"}</p>
            </div>
          </div>
          <img class="postimg" src="${createEventImage}" alt="Event Image" />
          <div class="carddetail">
            <h1 class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">${createEventTitle || "Untitled Event"}</h1>
            <p class="self-center text-sm mt-1 dark:text-white">${createEventDescription || "No description available"}</p>
            <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Time: <span>${createEventTime || "Not specified"}</span></h4>
            <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Date: <span>${createEventDate || "Not specified"}</span></h4>
            <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Location: ${createEventLocation || "Not specified"}</h4>
          </div>
        </div>`;
      eventsBox.innerHTML += card;
    });
  } catch (error) {
    console.log("Error fetching events:", error);
  }
}

displayEvents();


document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.body.classList.add("loaded");
  }, 4000);
});
