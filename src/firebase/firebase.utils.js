import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDEGd4zoK2GviaiydeLQaEUCtGJR58w71o",
    authDomain: "crown-db-bfcd6.firebaseapp.com",
    projectId: "crown-db-bfcd6",
    storageBucket: "crown-db-bfcd6.appspot.com",
    messagingSenderId: "856752330352",
    appId: "1:856752330352:web:c1d8bdd857c806a5d1c6b5",
    measurementId: "G-37F2TX18T7"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase