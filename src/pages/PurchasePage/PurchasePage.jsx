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
					alert("?????? ??????")
					history.push("/");
				}
				else alert("?????? ??????")
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
								<p>?????? ??????</p>
								{bagList.map( item => {
									return (
										<div className="item_block">
											<div className="item_name">{item.item_name}</div>
											<div className="item_price">{item.item_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;???</div>
											<div className="item_count">?? &nbsp;&nbsp;{item.item_count}&nbsp;???</div>
											<div className="item_equals">=</div>
											<div className="item_price_sum">{(item.item_price * item.item_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;???</div>
										</div>
									)
								})}
							</Block>
						</div>
						<div className="price_section">
							<Block>
								<p>?????? ?????? ??????</p>
								<div className="price_sum">
									<p>??? ?????? ?????? {sumOfPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</p>
									<i class="fas fa-plus"></i>
									<p>??? ????????? 0???</p>
									<i class="fas fa-equals"></i>
									<p>??? ???????????? {sumOfPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</p>
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
								<div className="item_price">{location.state.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;???</div>
								<div className="item_count">?? &nbsp;&nbsp;{location.state.count}&nbsp;???</div>
								<div className="item_equals">=</div>
								<div className="item_price_sum">{(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;???</div>
							</div>
						</div>
						<div className="price_section">
							<Block>
								<p>?????? ?????? ??????</p>
								<div className="price_sum">
									<p>??? ?????? ?????? {(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</p>
									<i class="fas fa-plus"></i>
									<p>??? ????????? 0???</p>
									<i class="fas fa-equals"></i>
									<p>??? ???????????? {(location.state.count * location.state.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</p>
								</div>
							</Block>
						</div>
					</div>
				)}
				<div className="delivery_section">
					<Block>
						<p>????????? ??????</p>
						<div className="input_block">
							<div className="input_title">??????</div>
							<input className="address" disabled value={address}/>
							<button className="address_search" type='button' style={{ width: "100px" }} onClick={openPostCode}>?????? ??????</button>
							<div id='popupDom'>
								{isPopupOpen && (
									<PopupDom>
										<PopupPostCode onClose={closePostCode} setAddress={setAddress} />
									</PopupDom>
								)}
							</div>
						</div>
						<div className="input_block">
							<div className="input_title">?????? ?????? ??????</div>
							<input className="address" />
						</div>
					</Block>
				</div>
				<div className="payment_section">
					<Block>
						<p>?????? ?????? ??????</p>
						<div className="input_block">
							<div className="input_title">?????? ??????</div>
							<input className="credit_num" type="password" value={cardNum} onChange={handleCardNum}/>
						</div>
						<div className="input_block">
							<div className="input_title">????????????</div>
							<input className="credit_month" placeholder="???" value={cardMonth} onChange={handleCardMonth} />
							&nbsp;/&nbsp;
							<input className="credit_year" placeholder="??????" value={cardYear} onChange={handleCardYear} />
						</div>
						<div className="input_block">
							<div className="input_title">?????? CVC??????</div>
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
						????????????
					</Button>
				</div>
			</div>
        </div>
    )
}

export default PurchasePage;
