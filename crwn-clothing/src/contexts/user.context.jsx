import { createContext, useState, useEffect } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
})

export const UserProvider = ({ children }) => {                                                                                   //  <==== export fournisseur, le composant est réel
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
           if(user) {
               createUserDocumentFromAuth(user)
           }
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])
    
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}