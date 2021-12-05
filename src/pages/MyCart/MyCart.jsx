import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Block from '../../components/Block/Block'
import Button from '../../components/Button/Button'
import CartList from "../../components/CartList/CartList"
import { callCart } from "../../store/actions/cartActions"
import { Link } from 'react-router-dom';

import './MyCart.scss'

const MyCart = ({history}) => {

    const dispatch = useDispatch()

    const { isLogin } = useSelector(state=>state.user)
    const { bagList, bagListLoading } = useSelector(state=>state.cart)

    const [sumOfPrice,setSumOfPrice] = useState()

    useEffect(()=>{
        if(!isLogin){
            history.push('/')
        }
    })

    useEffect(()=>{
        if(!bagListLoading){
            dispatch(callCart())
        }
        let priceOfAllCartList = 0
        bagList.map(item=>{
            priceOfAllCartList+=(item.item_count*item.item_price)
        })
        setSumOfPrice(priceOfAllCartList)
    },[JSON.stringify(bagList)])


    return (
        <div className="mycart-container">
            <p className="mycart-cart-desc">장바구니</p>
            <div className="mycart-first-section">
                <Block>
                    {bagList.map(item=>{
                        return (<CartList name={item.item_name} count={item.item_count} price={item.item_price}/>)
                    })}
                </Block>
            </div>
            <div className="mycart-second-section">
                <Block>
                    <p>결제 예정 금액</p>
                    <div className="mycart-calculate-cost">
                        <p>총 상품 가격 {sumOfPrice}원</p>
                        <i class="fas fa-plus"></i>
                        <p>총 배송비 0원</p>
                        <i class="fas fa-equals"></i>
                        <p>총 주문금액 {sumOfPrice}원</p>
                    </div>
                </Block>
            </div>
			<Link to={`/purchase/${"cart"}`}>
				<div className="mycart-order-button">
					<Button text="주문하기" size="22px" color="#ffffff"/>
				</div>
			</Link>
        </div>
    )
}

export default MyCart