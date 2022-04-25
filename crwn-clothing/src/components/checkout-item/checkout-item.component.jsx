import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ( {cartItem} ) => {
    const { name, imageUrl, price, quantity } = cartItem

    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)

    const addItemHandler = () => addItemToCart(cartItem)

    const removeItemHandler = () => removeItemToCart(cartItem)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className='name'> {name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span classname='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>      {/* <===========    bouton de suppresion dans un caractère spécial, 
                                                                                            ce caractère peut en fait être signifié en HTML sous forme de hashtag et esperluette 
                                                                                            ceci créera un bouton X, mais dans un type de format spécifique et dans une taille
                                                                                            assez grande */}
        </div>
    )
}

export default CheckoutItem