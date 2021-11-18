import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Modal from '../Modal/Modal'
import './ItemList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/actions/cartActions';
import { resetErrorSuccess } from '../../store/actions/userActions';

const ItemList = (list) => {

	const { isLogin, error } = useSelector(state=>state.user)

	const [modalOpen, setModalOpen] = useState('')
	const [formError, setFormError] = useState('')

	const dispatch = useDispatch()

	const handleAddCart = (name) => {
		if (!isLogin){
			setFormError("로그인이 필요합니다.")
			return
		}
		dispatch(addCart(name))
	}

	const handleModalClick = () => {
        setModalOpen('close')
        dispatch(resetErrorSuccess())
        setTimeout(() => {
            setFormError(prevState => '')  
        }, 500);
    }


	return (
		<>
			<Modal
				modalOpen={modalOpen}
				buttonText="확인"
				buttonSize="16px"
				onClick={handleModalClick}
				>
				{error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
				{formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
			</Modal>
			<div className="ItemList">
				<Grid container spacing={3} className="list_container">
					{list.list.map((c) => (
						<Grid item xs={3}>
							<div className="list_box">
								<div className="item_image">상품 이미지</div>
								<div className="item_name_cart">
									<p>{c.name}</p>
									<i class="fas fa-cart-plus fa-2x" onClick={()=>handleAddCart(c.name)}></i>
								</div>
								<div className="item_price">{c.price}</div>
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	)
}

export default ItemList;
