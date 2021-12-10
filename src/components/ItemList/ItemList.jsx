import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/actions/cartActions';
import { resetErrorSuccess } from '../../store/actions/userActions';
import { useHistory } from 'react-router';

import Breast from '../../img/닭가슴살.jpg';
import Mealkit from '../../img/도시락.jpg';
import Mixedrice from '../../img/볶음밥.jpg';
import Salad from '../../img/샐러드.jpg';
import Noodle from '../../img/면류.jpg';
import Steak from '../../img/스테이크.jpg';
import Dumpling from '../../img/만두.jpg';
import ETC from '../../img/기타.jpg';
import './ItemList.scss';

const ItemList = (list) => {

	const history = useHistory();

	const { isLogin } = useSelector(state=>state.user)
	const { error, loading, success } = useSelector(state=>state.cart)
	const [modalOpen, setModalOpen] = useState('')
	const [formError, setFormError] = useState('')

	const dispatch = useDispatch()

	const handleAddCart = (name,price) => {
		setModalOpen('open')
		if (!isLogin){
			setFormError("로그인이 필요합니다.")
			return
		}
		dispatch(addCart(name,1,price))
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
            </Modal>
            }
			<div className="ItemList">
				<Grid container spacing={3} className="list_container">
					{list.list.map((c) => (
						<Grid item xs={3}>
							<div className="list_box">
								<Link className="link" to={`/detail/${c.code}`}>
									{(function() {
										if (c.name.includes("샐러드")) return (<img className="item_image" src={Salad} />);
										else if (c.name.includes("도시락")) return (<img className="item_image" src={Mealkit} />);
										else if (c.name.includes("볶음밥")) return (<img className="item_image" src={Mixedrice} />);
										else if (c.name.includes("면")) return (<img className="item_image" src={Noodle} />);
										else if (c.name.includes("스테이크")) return (<img className="item_image" src={Steak} />);
										else if (c.name.includes("만두")) return (<img className="item_image" src={Dumpling} />);
										else if (c.name.includes("닭가슴살")) return (<img className="item_image" src={Breast} />);
										else return (<img className="item_image" src={ETC} />);
									})()}
								</Link>
								<div className="item_name">
									<Link className="link" to={`/detail/${c.code}`}>
										<p>{c.name}</p>
									</Link>
								</div>
								<div className="item_price_cart">
									<div className="item_price">{c.price.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;원</div>
									<i onClick={()=>handleAddCart(c.name,c.price.toFixed(0))} className="fas fa-cart-plus fa-2x" ></i>
								</div>
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	)
}

export default ItemList;
