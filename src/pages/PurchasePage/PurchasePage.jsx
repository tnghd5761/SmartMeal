import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Block from '../../components/Block/Block'
import { callCart } from "../../store/actions/cartActions"
import { info } from "../../store/actions/userActions"
import PopupDom from './PopupDom.jsx';
import PopupPostCode from './PopupPostCode.jsx';

import './PurchasePage.scss'

function PurchasePage({ history, match, location }) {
	const dispatch = useDispatch()

	const { isLogin, user, userListLoading } = useSelector(state=>state.user)
	useEffect(()=>{
        if(!userListLoading){
            dispatch(info())
        }
    },[])
	
	const { bagList, bagListLoading } = useSelector(state=>state.cart)
	const [sumOfPrice,setSumOfPrice] = useState(0)

	const [cardNum, setCardNum] = useState("");
	const [cardCVC, setCardCVC] = useState("");
	const [cardMonth, setCardMonth] = useState("");
	const [cardYear, setCardYear] = useState("");

	const [address, setAddress] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false)
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

	const handleCardNum = (e) => { setCardNum(e.target.value); }
	const handleCardCVC = (e) => { setCardCVC(e.target.value); }
	const handleCardMonth = (e) => { setCardMonth(e.target.value); }
	const handleCardYear = (e) => { setCardYear(e.target.value); }

	const handlePurchase = () => {
		const config = {
			method:'POST',
			headers:{
			  'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				oneTime:"True",
				user_id:user.user_name,
				email:user.user_id,
				cardNumber:cardNum,
				cardExpMonth:parseInt(cardMonth),
				cardExpYear:cardYear,
				cardCVC:cardCVC,
				cardName:`${user.user_id}'s card`,
				postal_code:"123456",
				amount:(sumOfPrice > 0 ? sumOfPrice : (location.state.count * location.state.item.price))
			})
		}
		console.log(config)
		fetch(`http://localhost:8080/pay/createCharge`, config)
			.then((res)=>{
				if (res.status === 200){
					alert("결제 성공")
					history.push("/");
				}
				else alert("결제 실패")
			})
	}

	useEffect(()=>{
        if(!isLogin){
            history.push('/')
        }
    })

	useEffect(()=>{
		if(match.params.id === "cart"){
			if(!bagListLoading){
				dispatch(callCart())
			}
			let priceOfAllCartList = 0
			bagList.map(item=>{
				priceOfAllCartList += (item.item_count*item.item_price)
			})
			setSumOfPrice(priceOfAllCartList)
		}
    },[JSON.stringify(bagList)])

    return (
        <div className="purchase_container">
			<div className="content">
				{match.params.id === "cart" && (
					<div>
						<div className="item_section">
							<Block>
								<p>주문 상품</p>
								{bagList.map( item => {
									return (
										<div className="item_block">
											<div className="item_name">{item.item_name}</div>
											<div className="item_price">{item.item_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
											<div className="item_count">× &nbsp;&nbsp;{item.item_count}&nbsp;개</div>
											<div className="item_equals">=</div>
											<div className="item_price_sum">{(item.item_price * item.item_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
										</div>
									)
								})}
							</Block>
						</div>
						<div className="price_section">
							<Block>
								<p>결제 예정 금액</p>
								<div className="price_sum">
									<p>총 상품 가격 {sumOfPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
									<i class="fas fa-plus"></i>
									<p>총 배송비 0원</p>
									<i class="fas fa-equals"></i>
									<p>총 주문금액 {sumOfPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
								</div>
							</Block>
						</div>
					</div>
				)}
				{match.params.id === "immediate" && (
					<div>
						<div className="item_section">
							<div className="item_block">
								<div className="item_name">{location.state.item.name}</div>
								<div className="item_price">{location.state.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
								<div className="item_count">× &nbsp;&nbsp;{location.state.count}&nbsp;개</div>
								<div className="item_equals">=</div>
								<div className="item_price_sum">{(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
							</div>
						</div>
						<div className="price_section">
							<Block>
								<p>결제 예정 금액</p>
								<div className="price_sum">
									<p>총 상품 가격 {(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
									<i class="fas fa-plus"></i>
									<p>총 배송비 0원</p>
									<i class="fas fa-equals"></i>
									<p>총 주문금액 {(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
								</div>
							</Block>
						</div>
					</div>
				)}
				<div className="delivery_section">
					<Block>
						<p>배송지 입력</p>
						<div className="input_block">
							<div className="input_title">주소</div>
							<input className="address" disabled value={address}/>
							<button className="address_search" type='button' style={{ width: "100px" }} onClick={openPostCode}>주소 검색</button>
							<div id='popupDom'>
								{isPopupOpen && (
									<PopupDom>
										<PopupPostCode onClose={closePostCode} setAddress={setAddress} />
									</PopupDom>
								)}
							</div>
						</div>
						<div className="input_block">
							<div className="input_title">주소 세부 입력</div>
							<input className="address" />
						</div>
					</Block>
				</div>
				<div className="payment_section">
					<Block>
						<p>결제 정보 입력</p>
						<div className="input_block">
							<div className="input_title">카드 번호</div>
							<input className="credit_num" type="password" value={cardNum} onChange={handleCardNum}/>
						</div>
						<div className="input_block">
							<div className="input_title">유효기간</div>
							<input className="credit_month" placeholder="월" value={cardMonth} onChange={handleCardMonth} />
							&nbsp;/&nbsp;
							<input className="credit_year" placeholder="년도" value={cardYear} onChange={handleCardYear} />
						</div>
						<div className="input_block">
							<div className="input_title">카드 CVC번호</div>
							<input className="credit_password" type="password" placeholder="" value={cardCVC} onChange={handleCardCVC} />
						</div>
					</Block>
				</div>
				<div className="button_section">
					<Button
						className="pay_btn"
						variant="contained"
						color="secondary"
						style={{ width: "100px", height: "40px", fontFamily: "Noto Sans KR", fontSize: "1.1em" }}
						onClick={handlePurchase}
						>
						결제하기
					</Button>
				</div>
			</div>
        </div>
    )
}

export default PurchasePage;
