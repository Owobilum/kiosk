import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_KEY}`,
    authDomain: "kiosk-db.firebaseapp.com",
    projectId: "kiosk-db",
    storageBucket: "kiosk-db.appspot.com",
    messagingSenderId: "462384137747",
    appId: "1:462384137747:web:6b7d26516035949ef861e6",
    measurementId: "G-Q4N42XBJ0H"
};

const app = initializeApp(firebaseConfig); //APP HAS TO BE INITIALIZED 1st BEFORE USING AUTH OR FIRESTORE

export const db = getFirestore()
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();


// export const storeUserToDb = async (name, email, date, userId) => {

//     const docRef = doc(db, "users", userId); //queryReference
//     const docSnap = await getDoc(docRef); //qurerySnapshot

//     if (docSnap.exists()) {
//         // console.log("Document Data Exists:", docSnap.data());
//         return
//     } else {
//         // doc.data() will be undefined in this case
//         try {
//             let data = {
//                 displayName: name,
//                 email: email,
//                 createdAt: date
//             }
//             // const docRef = await addDoc(collection(db, "users",userId), {
//             const docRef = await setDoc(doc(db, "users", userId), data)
//             // console.log("Document written with ID: ", docRef.id);
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     }
// }

// export const signInWithGoogle = () => {
//     return signInWithPopup(auth, provider)
//         .then((result) => {
//             console.log(result)
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;

//             // ...
//             return { user, token, credential }

//             // storeUserToDb(user.displayName,user.email,new Date(),user.uid)
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
// }

// export const signOut = () => auth.signOut()

export const signUpWithEmail = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

export const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}