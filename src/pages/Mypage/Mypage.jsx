import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Button from '../../components/Button/Button'
import { info } from "../../store/actions/userActions"

import './Mypage.scss'

const Mypage = ({history}) => {

    const dispatch = useDispatch()
    
    const { isLogin, user, userListLoading } = useSelector(state=>state.user)

    useEffect(()=>{
         if(!isLogin){
            history.push('/')
         }
    })
    
    useEffect(()=>{
        if(!userListLoading){
            dispatch(info())
        }
    },[])

    return (
        <div className="mypage-container">
			<div className="mypage-title">
				<p>마이 페이지</p>
			</div>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>

            <div className= "mypage-component">
                <p className="mypage-staus">내 회원정보 </p>
                    <div className="mypage-info">
                        <div className = "mypage-userinfo">
                            <div className = "name_info">
                                <div className="name">
                                    <p>닉네임: </p>
                                </div>
                                <div className="name_text">
                                    <p className="user_info_text">{user.user_name} </p>
                                </div>
                            </div>
                            <div className = "id_info">
                                <div className="id">
                                    <p>아이디(이메일): </p>
                                </div>
                                <div className="id_text">
                                    <p className="user_info_text">{user.user_id} </p>
                                </div>
                            </div>
                            <div className="update-button">                             
                                 <Button color="#9CC094" text="수정" link="/update" size="20px" />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Mypage 