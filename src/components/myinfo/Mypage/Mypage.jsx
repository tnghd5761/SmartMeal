import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Button from "../../Button/Button";
import { info } from "../../../store/actions/userActions"

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
        <div className="navbar-container">
            <p classname="mypage-title">마이 페이지</p>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>

            <div className= "mypage-component">
                <p className="mypage-staus">내 회원정보 </p>
                    <div className="mypage-info">
                        <p className="nickname">닉네임: {user.user_name} </p>
                        <p className="id">아이디(이메일): {user.user_id} </p>
                    </div>
                    <div className="update-button">
                    <Button color="#9CC094" text="수정" link="/mypage/update" size="20px" />
                    </div>
            </div>
        </div>
    );
}

export default Mypage 