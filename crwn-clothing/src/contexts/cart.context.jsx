import { createContext, useState, useEffect } from "react";                                    /* importation du context de création ainsi la déclaration de l'état si c'est vrai ou faux, indiquant si la cart est ouverte ou non */

const addCartItem = (cartItems, productToAdd) => {
    //trouver si cartItems contient productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //si trouvé, incrémenter la quantité
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
        )
    }
    //renvoie un nouveau tableau avec cartItems modifié/ nouvel article de panier
    return [...cartItems, {...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({                                          /* Création du context qui concerne le context de panier réel */ 
    isCartOpen: false,                                                              /* À l'intérieur, nous voulons faire en sorte que le panier soit ouvert, donné lui un nom et par default ce sera faux */
    setIsCartOpen: () => {},                                                        /* setIsCartOpen va pointer vers une fonction. */
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})
     


export const CartProvider = ({ children }) => {                                   /* Création du fournisseur, CartProvider est égal à cette fonction qui prendra les enfants */
    const [isCartOpen, setIsCartOpen] = useState(false)                           /* Constante que nous dirons que le panier est ouvert et que le panier ouvert est égal à l'état faux */
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }                                   /* La valeur qui est défini est le panier ouvert et l'ensemble est la fonction de définition du panier ouvert obtenue de notre état*/

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>  /* Ceci est le réel que vous déclarez et nous transmettons comme valeur */
}