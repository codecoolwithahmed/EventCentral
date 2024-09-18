import {
    auth,
    db,
    onAuthStateChanged,
    getDoc,
    doc,
} from "../../firebase/firebase.js";

let profilesection = document.getElementById("profilesection");
let profilephoto1 = document.getElementById("profilephoto");

async function loaddocument() {
    profilesection.innerHTML = "<p>Loading...</p>";

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            try {
                const userRef = doc(db, "users", uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    // console.log(docSnap.data());

                    const {
                        cnic,
                        email,
                        gender,
                        location,
                        name,
                        number,
                        password,
                        username,
                        profilePhotoInput,
                    } = docSnap.data();

                    const userinfo = `
                    <h4>Name: <span>${name}</span></h4>
                    <h4>Email: <span>${email}</span></h4>
                    <h4>Password: <span>${password}</span></h4>
                    <h4>Username: <span>${username}</span></h4>
                    <h4>Number: <span>${number}</span></h4>
                    <h4>CNIC: <span>${cnic}</span></h4>
                    <h4>Gender: <span>${gender}</span></h4>
                    <h4>Location: <span>${location}</span></h4>`;

                    profilesection.innerHTML = userinfo;

                    profilephoto1.src = profilePhotoInput;
                    // console.log(profilePhotoInput);
                } else {
                    console.log("No such document!");
                    profilesection.innerHTML = "<p>No user data found.</p>";
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                profilesection.innerHTML = "<p>Error loading user data.</p>";
            }
        } else {
            profilesection.innerHTML = "<p>User is not logged in.</p>";
        }
    });
}

loaddocument();
