import React, { useState } from "react";
import Button from "../../Button/Button";
import './Delete.scss'

const Delete = () => {
    var confirmpw = null;
    const [user, setuser] = useState({
        Nickname: '홍길동',
        ID: 'dlrdktks1004@naver.com',
        PW: '123456789',
        ConfirmPW: ' '
    });

    const onClick = (e) => {
            alert('정말 탈퇴하시겠습니까?');
    };

    return (
        <div className="navbar-container">
            <p classname="mypage-title">마이 페이지</p>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>
            <div className= "mypage-delete-component">
                <p className="mypage-staus">회원 탈퇴</p>
                <div className="check-userinfo">
                    <p className="user-prove">본인 확인 인증 </p>
                    <div className="check-pw">
                        <p>-Check Your PassWord-</p>
                    </div>
                        <input className="new-data"
                            type="password"
                            placeholder="PassWord을 입력하시오."
                        ></input>
                    <div className="delete-button">
                    <Button color="#9CC094" text="탈퇴" link="/" size="20px" onClick={onClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delete 