import React, { useState, useEffect } from 'react';
import { styled, Button, Table, TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './ItemDetailPage.scss';

function ItemDetailPage({ match }) {
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
	const MyTableCell = styled(TableCell)({
		borderBottom:"1px solid black",
	})
	return (
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
								}}>
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
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
						<TableRow>
							<MyTableCell align="left" width="200px">탄수화물</MyTableCell>
							<MyTableCell align="right" width="200px">{item.carbohydrate}&nbsp;g</MyTableCell>
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
						<TableRow>
							<MyTableCell align="left" width="200px">당류</MyTableCell>
							<MyTableCell align="right" width="200px">2.7&nbsp;g</MyTableCell>
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
					</Table>
					<Table className="nutrient_table">
						<TableRow>
							<MyTableCell align="left" width="200px">단백질</MyTableCell>
							<MyTableCell align="right" width="200px">{item.protein}&nbsp;g</MyTableCell>
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
						<TableRow>
							<MyTableCell align="left" width="200px">지방</MyTableCell>
							<MyTableCell align="right" width="200px">{item.fat}&nbsp;g</MyTableCell>
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
						<TableRow>
							<MyTableCell align="left" width="200px">포화지방</MyTableCell>
							<MyTableCell align="right" width="200px">2.2&nbsp;g</MyTableCell>
							<MyTableCell align="right" width="200px">00&nbsp;%</MyTableCell>
						</TableRow>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default ItemDetailPage;
