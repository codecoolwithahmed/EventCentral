import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  auth,
  getDoc,
  doc,
  onAuthStateChanged,
} from "../../firebase/firebase.js";

let createEventImage = document.getElementById("createEventImage");
let createEventTitle = document.getElementById("createEventTitle");
let createEventDescription = document.getElementById("createEventDescription");
let createEventLocation = document.getElementById("createEventLocation");
let createEventDate = document.getElementById("createEventDate");
let createEventTime = document.getElementById("createEventTime");
let createEventBtn = document.getElementById("createEventBtn");
let getuserdata = {};

// Check for authenticated user and fetch user data
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      getuserdata = docSnap.data();
    } else {
      console.log("No such document!");
    }
  }
});

createEventBtn.addEventListener("click", () => {
  if (!auth.currentUser) {
    console.log("User not authenticated");
    return;
  }

  // Ensure an image file is selected
  if (!createEventImage.files[0]) {
    console.log("No image file selected");
    return;
  }

  const createEvent = {
    createEventImage: createEventImage.files[0],
    createEventTitle: createEventTitle.value,
    createEventDescription: createEventDescription.value,
    createEventLocation: createEventLocation.value,
    createEventDate: createEventDate.value,
    createEventTime: createEventTime.value,
    createEventByuid: auth.currentUser.uid,
    createEventByEmail: auth.currentUser.email,
    createEventByName: getuserdata.name || "Anonymous",
    createEventByUserName: getuserdata.username || "Anonymous",
    profilePhotoInput: getuserdata.profilePhotoInput || "",
  };

  createEventBtn.disabled = true;
  createEventBtn.innerHTML = "Loading...";

  const imagesRef = ref(storage, `event_images/${createEvent.createEventImage.name}`);

  uploadBytes(imagesRef, createEvent.createEventImage)
    .then(() => {
      return getDownloadURL(imagesRef);
    })
    .then((url) => {
      createEvent.createEventImage = url;

      const eventCollection = collection(db, "events");
      return addDoc(eventCollection, createEvent);
    })
    .then(() => {
      console.log("Event added successfully");
      createEventBtn.disabled = false;
      createEventBtn.innerHTML = "Create Event";
    })
    .catch((err) => {
      console.log("Error occurred: ", err);
      createEventBtn.disabled = false;
      createEventBtn.innerHTML = "Error";
    });
});
