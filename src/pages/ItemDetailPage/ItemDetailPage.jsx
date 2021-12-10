import React, { useState, useEffect } from 'react';
import { styled, Button, Table, TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/actions/cartActions';
import { resetErrorSuccess } from '../../store/actions/userActions';

import Breast from '../../img/닭가슴살.jpg';
import Mealkit from '../../img/도시락.jpg';
import Mixedrice from '../../img/볶음밥.jpg';
import Salad from '../../img/샐러드.jpg';
import Noodle from '../../img/면류.jpg';
import Steak from '../../img/스테이크.jpg';
import Dumpling from '../../img/만두.jpg';
import ETC from '../../img/기타.jpg';
import './ItemDetailPage.scss';

function ItemDetailPage({ match }) {
	const { isLogin } = useSelector(state=>state.user)
	const [item, setItem] = useState(
		{
			name: "",
			price: "",
		}
	);
	const itemID = match.params.id;
	useEffect(async() => {
		await fetch(`http://localhost:8080/foods?code=${itemID}`)
			.then((res)=>res.json())
			.then((data)=>setItem(data[0]));
    },[])
	console.log(item);

	const [amount, setAmount] = useState(1);
	const amountPlus = (event) => {
		setAmount(amount+1);
	};
	const amountMinus = (event) => {
		if(amount > 1){
			setAmount(amount-1);
		}
	};

	const { success, error, loading } = useSelector(state=>state.cart)
	const [modalOpen, setModalOpen] = useState('')
	const [formError, setFormError] = useState('')

	const dispatch = useDispatch()

	const handleAddCart = (name,amount,price) => {
		setModalOpen('open')
		if (!isLogin){
			setFormError("로그인이 필요합니다.")
			return
		}
		dispatch(addCart(name,amount,price))
	}

	const MyTableCell = styled(TableCell)({
		borderBottom:"1px solid black",
	})

	const handleModalClick = () => {
        setModalOpen('close')
        dispatch(resetErrorSuccess())
        setTimeout(() => {
            setFormError(prevState => '')  
        }, 500);
    }


	return (
		<>
			{!loading &&
            <Modal
                modalOpen={modalOpen}
                buttonText="확인"
                buttonSize="16px"
                onClick={handleModalClick}
                >
                {success && success.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
            </Modal>}
			<div className="detailpage_container">
				<div className="main_container">
					{(function() {
						if (item.name.includes("샐러드")) return (<img className="item_image" src={Salad} />);
						else if (item.name.includes("도시락")) return (<img className="item_image" src={Mealkit} />);
						else if (item.name.includes("볶음밥")) return (<img className="item_image" src={Mixedrice} />);
						else if (item.name.includes("면")) return (<img className="item_image" src={Noodle} />);
						else if (item.name.includes("스테이크")) return (<img className="item_image" src={Steak} />);
						else if (item.name.includes("만두")) return (<img className="item_image" src={Dumpling} />);
						else if (item.name.includes("닭가슴살")) return (<img className="item_image" src={Breast} />);
						else return (<img className="item_image" src={ETC} />);
					})()}
					<div className="content">
						<div className="name">{item.name}</div>
						<div className="cost">{Math.floor(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
						<div className="count">
							<div className="count_field">
								<div className="amount_container">
									<button className="plusminus_btn" onClick={amountMinus}>-</button>
									<div className="amount_num">{amount}</div>
									<button className="plusminus_btn" onClick={amountPlus}>+</button>
								</div>
								<div className="final_price">
									{Math.floor(item.price * amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원
								</div>
							</div>
						</div>
						<div className="decise_btn">
							<div className="in_bag">
								<Button
									style={{
										backgroundColor: "#E9F7FB",
										border: "2px solid #1979FF",
										color: "#1979FF",
										padding: "8px 28px",
										fontSize: "18px"
									}}
									onClick={()=>handleAddCart(item.name,amount,item.price.toFixed(0))}
								>
									장바구니
								</Button>
							</div>
							<div className="buy_now">
								<Link to={{ pathname: `/purchase/${"immediate"}`, state: { item: item, count: amount} }}>
									<Button
										style={{
											backgroundColor: "#1979FF",
											border: "2px solid #66A6FF",
											color: "#E9F7FB",
											padding: "8px 28px",
											fontSize: "18px"
										}}>
										즉시구매
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="explain_container">
					<div className="explain_title">상품 정보</div>
					<div className="nutrient_container">
						<Table className="nutrient_table">
							<TableRow>
								<MyTableCell align="left" width="200px">열량</MyTableCell>
								<MyTableCell align="right" width="200px">{item.kcal}&nbsp;kcal</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(item.kcal / 2000 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">탄수화물</MyTableCell>
								<MyTableCell align="right" width="200px">{item.carbohydrate}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(item.carbohydrate / 324 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">당류</MyTableCell>
								<MyTableCell align="right" width="200px">14&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(14 / 100 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
						</Table>
						<Table className="nutrient_table">
							<TableRow>
								<MyTableCell align="left" width="200px">단백질</MyTableCell>
								<MyTableCell align="right" width="200px">{item.protein}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(item.protein / 55 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">지방</MyTableCell>
								<MyTableCell align="right" width="200px">{item.fat}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(item.fat / 54 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">포화지방</MyTableCell>
								<MyTableCell align="right" width="200px">2.2&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">{Math.round(2.2 / 15 * 100)}&nbsp;%</MyTableCell>
							</TableRow>
						</Table>
					</div>
				</div>
			</div>
		</>
	)
}

export default ItemDetailPage;
