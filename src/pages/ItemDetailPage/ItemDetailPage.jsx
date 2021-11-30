import React, { useState } from 'react';
import { styled, Button, Table, TableRow, TableCell } from '@material-ui/core';
import './ItemDetailPage.scss';
import Modal from '../../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/actions/cartActions';
import { resetErrorSuccess } from '../../store/actions/userActions';

const ItemDetailPage = () => {

	const { success, error, loading } = useSelector(state=>state.cart)
	const [modalOpen, setModalOpen] = useState('')
	const [formError, setFormError] = useState('')
	const [amount, setAmount] = useState(1);

	const dispatch = useDispatch()

	
	const item = {
		name: "닭가슴살 볶음밥",
		price: 7800,
		nutrient: {
			carlorie: 200,
			carbohydrate: 47,
			sugar: 2,
			protein: 12,
			fat: 3.3,
			s_fat: 0.5
		}
	}

	const handleAddCart = (name,amount,price) => {
		setModalOpen('open')
		dispatch(addCart(name,amount,price))
	}

	const amountPlus = (event) => {
		setAmount(amount+1);
	};
	const amountMinus = (event) => {
		if(amount > 1){
			setAmount(amount-1);
		}
	};
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
					<div className="item_image">상품 이미지</div>
					<div className="content">
						<div className="name">{item.name}</div>
						<div className="cost">{item.price}&nbsp;원</div>
						<div className="count">
							<div className="count_field">
								<div className="amount_container">
									<button className="plusminus_btn" onClick={amountMinus}>-</button>
									<div className="amount_num">{amount}</div>
									<button className="plusminus_btn" onClick={amountPlus}>+</button>
								</div>
								<div className="final_price">
									{(item.price * amount)}&nbsp;원
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
									onClick={()=>handleAddCart(item.name,amount,item.price)}
								>
									장바구니
								</Button>
							</div>
							<div className="buy_now">
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
								<MyTableCell align="right" width="200px">{item.nutrient.carlorie}&nbsp;kcal</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">탄수화물</MyTableCell>
								<MyTableCell align="right" width="200px">{item.nutrient.carbohydrate}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">당류</MyTableCell>
								<MyTableCell align="right" width="200px">{item.nutrient.sugar}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
						</Table>
						<Table className="nutrient_table">
							<TableRow>
								<MyTableCell align="left" width="200px">단백질</MyTableCell>
								<MyTableCell align="right" width="200px">{item.nutrient.protein}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">지방</MyTableCell>
								<MyTableCell align="right" width="200px">{item.nutrient.fat}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
							<TableRow>
								<MyTableCell align="left" width="200px">포화지방</MyTableCell>
								<MyTableCell align="right" width="200px">{item.nutrient.s_fat}&nbsp;g</MyTableCell>
								<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
							</TableRow>
						</Table>
					</div>
				</div>
			</div>
		</>
	)
}

export default ItemDetailPage;