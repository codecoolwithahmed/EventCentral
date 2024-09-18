import {
  auth,
  onAuthStateChanged,
  getDocs,
  collection,
  db,
  query,
  where,
} from "../../firebase/firebase.js";

let eventsBox = document.getElementById("events");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    myEvents(uid);
  } else {
    console.log("User is not authenticated.");
    window.location.href = "../../auth/signin/index.html";
  }
});

async function myEvents(uid) {
  try {
    const q = query(
      collection(db, "events"),
      where("createEventByuid", "==", uid)
    );
    const querySnapshot = await getDocs(q);

    eventsBox.innerHTML = "";

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const databox = doc.data();
        // console.log(doc.data());
        
        const {
          createEventByName,
          createEventByUserName,
          createEventByuid,
          createEventDate,
          createEventDescription,
          createEventImage,
          createEventLocation,
          createEventTime,
          createEventTitle,
          profilePhotoInput,
        } = databox;

        // Create event card HTML
        const cards = `
          <div class="event_card">
            <div class="upparpart">
              <img alt="User Profile" src="${profilePhotoInput ||  'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg'}" class="userprofile"/>
              <div class="cardusername">
                <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white"  >${createEventByName || "Unknown Name"
          }</h4>
                <p class="self-center text-sm whitespace-nowrap dark:text-white" >@${createEventByUserName || "Unknown Username"
          }</p>
              </div>
            </div>
            <img class="postimg" src="${createEventImage || "default-image-url.jpg"
          }" alt="Event Image" />
            <div class="carddetail">
              <h1 class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" >${createEventTitle || "Untitled Event"
          }</h1>
              <p class="self-center text-sm dark:text-white" >${createEventDescription || "No description provided."
          }</p>
              <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white" >Location: ${createEventLocation || "No location specified."
          }</h4>
              <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white" >Time: <span>${createEventTime || "N/A"
          }</span></h4>
              <h4 class="self-center text-sm font-semibold whitespace-nowrap dark:text-white" >Date: <span>${createEventDate || "N/A"
          }</span></h4>
            </div>
          </div>`;

        eventsBox.innerHTML += cards;
      });
    } else {
      eventsBox.innerHTML =
        "<p>Click on 'Create New Event' to add your events</p>";
    }
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}
