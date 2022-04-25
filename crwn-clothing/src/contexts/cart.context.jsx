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

const removeCartItem = (cartItems, cartItemToRemove) => {

    // trouver l'article du panier à supprimer
    
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    )

    // vérifier ci la quantité est égale à 1, si c'est le cas supprimer cet article du panier
    
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // renvoyer le cartItems à l'article du panier correspondant avec un quantité réduite

    return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({                                          /* Création du context qui concerne le context de panier réel */ 
    isCartOpen: false,                                                              /* À l'intérieur, nous voulons faire en sorte que le panier soit ouvert, donné lui un nom et par default ce sera faux */
    setIsCartOpen: () => {},                                                        /* setIsCartOpen va pointer vers une fonction. */
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})
     


export const CartProvider = ({ children }) => {                                   /* Création du fournisseur, CartProvider est égal à cette fonction qui prendra les enfants */
    const [isCartOpen, setIsCartOpen] = useState(false)                           /* Constante que nous dirons que le panier est ouvert et que le panier ouvert est égal à l'état faux */
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])
    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    }                                   /* La valeur qui est défini est le panier ouvert et l'ensemble est la fonction de définition du panier ouvert obtenue de notre état*/

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>  /* Ceci est le réel que vous déclarez et nous transmettons comme valeur */
}