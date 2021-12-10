import React from "react"
import { useDispatch } from "react-redux"
import { deleteCart } from "../../store/actions/cartActions"

import './CartList.scss'

const CartList = (props) => {

    const dispatch = useDispatch()
    
    const handleDeleteProduct = (name) => {
        dispatch(deleteCart(name))
    }


    return (
        <div className="cart-list-component">
            <p>{props.name}</p>
            <p>{props.count}</p>
            <p>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <i onClick={()=>handleDeleteProduct(props.name)} class="fas fa-times"></i>
        </div>
    )
}

export default CartList