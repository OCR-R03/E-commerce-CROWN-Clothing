import { createContext, useState } from "react";                                    /* importation du context de création ainsi la déclaration de l'état si c'est vrai ou faux, indiquant si la cart est ouverte ou non */

export const CartContext = createContext({                                          /* Création du context qui concerne le context de panier réel */ 
    isCartOpen: false,                                                                               /* À l'intérieur, nous voulons faire en sorte que le panier soit ouvert, donné lui un nom et par default ce sera faux */
    setIsCartOpen: () => {},                                                                      /* setIsCartOpen va pointer vers une fonction. */
})

export const CartProvider = ({ children }) => {                                      /* Création du fournisseur, CartProvider est égal à cette fonction qui prendra les enfants */
    const [isCartOpen, setIsCartOpen] = useState(false)                      /* Constante que nous dirons que le panier est ouvert et que le panier ouvert est égal à l'état faux */
    const value = { isCartOpen, setIsCartOpen }                                   /* La valeur qui est défini est le panier ouvert et l'ensemble est la fonction de définition du panier ouvert obtenue de notre état*/

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>   /* Ceci est le réel que vous déclarez et nous transmettons comme valeur */
}