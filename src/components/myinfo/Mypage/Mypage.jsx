import React, { useState } from "react";
import Button from "../../Button/Button";
// import Update from './components/myinfo/Mypage/Update/Update';
// import Read from './components/myinfo/Mypage/Read/Read';

import './Mypage.scss'

const Mypage = () => {

    const [user, setuser] = useState({
        Nickname: '홍길동',
        ID: 'dlrdktks1004@naver.com',
        PW: '123456789',
        ConfirmPW: '123456789'
    });

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
                    <div className="mypage-userinfo">
                        <p className="nickname">닉네임: {user.Nickname}</p>
                    </div>
                    <div className="mypage-userinfo">
                        <p className="id">아이디: {user.ID}</p>
                    </div>
                    <div className="mypage-userinfo">
                        <p className="password">비밀번호: {user.PW}</p>
                    </div>
                    <div className="update-button">
                    <Button color="#9CC094" text="수정" link="/mypage/update" size="20px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage 