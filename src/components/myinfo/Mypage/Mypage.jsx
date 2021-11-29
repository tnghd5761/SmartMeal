import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";

import './Mypage.scss'

const Mypage = () => {

    const [user] = useState({
        name: '홍길동',
        id: 'ghdrlfehd1234@naver.com',
        password: '123456789',
        Confirmpw: '123456789'
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
                        <p className="nickname">닉네임: {user.name}</p>
                        <p className="id">아이디(이메일): {user.id}</p>
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