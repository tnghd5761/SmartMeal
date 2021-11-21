import React from "react"

import './CartList.scss'

const CartList = (props) => {
    return (
        <div className="cart-list-component">
            <p>{props.name}</p>
            <p>{props.count}</p>
        </div>
    )
}

export default CartList