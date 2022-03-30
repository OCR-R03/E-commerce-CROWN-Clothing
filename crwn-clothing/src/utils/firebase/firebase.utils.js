import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
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

  const provider = new GoogleAuthProvider()
  
  provider.setCustomParameters({
      prompt: "select_account"
  })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}