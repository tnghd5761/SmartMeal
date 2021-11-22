import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Block from '../../components/Block/Block'
import Button from '../../components/Button/Button'
import CartList from "../../components/CartList/CartList"
import { callCart } from "../../store/actions/cartActions"

import './MyCart.scss'

const MyCart = ({history}) => {

    const dispatch = useDispatch()

    const { isLogin } = useSelector(state=>state.user)
    const { bagList, bagListLoading } = useSelector(state=>state.cart)

    // useEffect(()=>{
    //     if(!isLogin){
    //         history.push('/')
    //     }
    // })

    useEffect(()=>{
        dispatch(callCart())
    },[])

    console.log(bagList) // 추후 삭제

    return (
        <div className="mycart-container">
            <p className="mycart-cart-desc">장바구니</p>
            <div className="mycart-first-section">
                <Block>
                    {bagList.length>0&&bagList.map(item=>{
                        <CartList name={item.item_name} count={item.item_count}/>
                    })}
                    {/* <CartList name="이동기" count="7"/>
                    <CartList name="이동기" count="7"/>
                    <CartList name="이동기" count="7"/>
                    <CartList name="이동기" count="7"/>
                    <CartList name="이동기" count="7"/>
                    <CartList name="이동기" count="7"/> */}
                </Block>
            </div>
            <div className="mycart-second-section">
                <Block>
                    <p>결제 예정 금액</p>
                    <div className="mycart-calculate-cost">
                        <p>총 상품 가격 0원</p>
                        <i class="fas fa-plus"></i>
                        <p>총 배송비 0원</p>
                        <i class="fas fa-equals"></i>
                        <p>총 주문금액 0원</p>
                    </div>
                </Block>
            </div>
            <div className="mycart-order-button">
                <Button text="주문하기" size="22px" color="#ffffff"/>
            </div>
        </div>
    )
}

export default MyCart