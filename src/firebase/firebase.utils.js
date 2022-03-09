import firebase from 'firebase/compat/app' // need the 'firebase' keyword as this allows us to use firestore and auth when we import them in
import 'firebase/compat/firestore' // for the db
import 'firebase/compat/auth' // for the auth

const firebaseConfig = {
    apiKey: "AIzaSyDEGd4zoK2GviaiydeLQaEUCtGJR58w71o",
    authDomain: "crown-db-bfcd6.firebaseapp.com",
    projectId: "crown-db-bfcd6",
    storageBucket: "crown-db-bfcd6.appspot.com",
    messagingSenderId: "856752330352",
    appId: "1:856752330352:web:c1d8bdd857c806a5d1c6b5",
    measurementId: "G-37F2TX18T7"
}

export const createUserProfileDoc = async (userAuth, otherData) => {
    if (!userAuth) return // will return null if no user logged in

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get() // gets the document snapshot from firebase.

    // console.log(snapshot)

    // if there is no userReference in firebase then we will create a new userDocument
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...otherData
            })
        } catch (err) {
            console.log("error creating user", err.message)
        }
    }

    return userRef
}

// initialising our firebase config from above
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth() // this is the auth given from firebase -> we can export this out to where we need it
export const firestore = firebase.firestore() // this is the db from firebase -> we can export this out to where we need it

const provider = new firebase.auth.GoogleAuthProvider() // gives us access to the firebase provider class
provider.setCustomParameters({ prompt: "select_account" }) // this will trigger the google auth popup when ever we use the provider for authentication or signin
export const signInWithGoogle = () => auth.signInWithPopup(provider) // this will trigger the google auth popup when ever we use the provider for authentication

export default firebase