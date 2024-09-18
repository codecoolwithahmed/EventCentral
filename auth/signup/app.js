import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../firebase/firebase.js";

let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let gender = document.getElementById("gender");
let username = document.getElementById("username");
let number = document.getElementById("number");
let cnic = document.getElementById("cnic");
let location = document.getElementById("location");
let profilePhotoInput = document.getElementById("profilePhotoInput");

let signup = document.getElementById("signup");

signup.addEventListener("click", () => {
  const userobj = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    gender: gender.value,
    number: number.value,
    cnic: cnic.value,
    location: location.value,
    profilePhotoInput: profilePhotoInput.files[0],
  };

  signup.disable = true;
  signup.innerHTML = "Loading...";

  createUserWithEmailAndPassword(auth, userobj.email, userobj.password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = userCredential.user.uid;
      userobj.uid = uid;
      // console.log(userobj);

      const profileRef = ref(
        storage,
        `profile_images/${userobj.profilePhotoInput.name}`
      );
      uploadBytes(profileRef, userobj.profilePhotoInput)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(profileRef)
            .then((url) => {
              userobj.profilePhotoInput = url;
              // console.log(createEvent);
              // console.log("url => ", url);

              const userref = doc(db, "users", uid);
              setDoc(userref, userobj)
                .then(() => {
                  console.log("data gya db mein");
                  signup.disable = false;
                  signup.innerHTML = "Sign Up";
                  new Noty({
                    text: "Account Succefully Created!",
                    type: "success",
                    layout: "topRight",
                    timeout: 3000,
                  }).show();
                  // console.log("userobj-=>", userobj);
                  signup.disable = false;
                  signup.innerHTML = "Sign Up";

                  setTimeout(() => {
                    window.location.href = "../../index.html"; // Page change hojayga 3 seconds ka baaad
                  }, 5000);
                })
                .catch((err) => {
                  console.log(err);
                  signup.disable = false;
                  signup.innerHTML = "Sign Up";
                });
            })
            .catch((err) => {
              console.log("err in uploading url=>", err);
              signup.disable = false;
              signup.innerHTML = "Sign Up";
            });
        })
        .catch((err) => {
          console.log("Error during file upload:", err);
          signup.disable = false;
          signup.innerHTML = "Sign Up";
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      signup.disable = false;
      signup.innerHTML = "Sign Up";
      new Noty({
        text: error.message,
        type: "error",
        layout: "topRight",
        timeout: 3000,
      }).show();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("loaded");
});
