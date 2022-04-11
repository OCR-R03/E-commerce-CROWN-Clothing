/* =======================================
        Ce code est coder en dur !!! ou HARDCODE
    
    Un code dur est une partie de programme qui ne 
    peut être modifié en aucune façon, sauf en 
    changeant le code source du programme lui-même
========================================*/
    
import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: []
})

export const ProductsProvider = ({children}) => {

    const [products, setproducts] = useState(PRODUCTS)
    const value = {products}

    return(
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}