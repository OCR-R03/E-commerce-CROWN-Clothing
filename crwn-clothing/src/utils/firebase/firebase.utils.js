import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from 'firebase/auth' 

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {                                                      //      <==== SDK Firebase
    apiKey: "AIzaSyBCFgTWfRO5sWtwqHG77MjgcRNqJVsGaHE",
    authDomain: "crwn-clothing-db-3e8b3.firebaseapp.com",
    projectId: "crwn-clothing-db-3e8b3",
    storageBucket: "crwn-clothing-db-3e8b3.appspot.com",
    messagingSenderId: "20114553569",
    appId: "1:20114553569:web:1ab1a64f1208aa26c4d5a0"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  
  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)