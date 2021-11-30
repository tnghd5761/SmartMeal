import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Button/Button";
import './Delete.scss'

// import { useSelector, useDispatch } from "react-redux";

const Delete = () => {
    // const [user] = useState({
    //     name: '홍길동',
    //     id: 'dlrdktks1004@naver.com',
    //     password: '123456789',
    //     Confirmpw: ' '
    // });
    const [password, setpassword] = useState('123456789')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
        confirmPasswordError: "",
    });
    
    const { confirmPasswordError } = errorMessage;


    useEffect(() => {
        if (password === confirmPassword || confirmPassword === "") {
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "",
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "비밀번호가 일치하지 않습니다.",
          });
        }
    }, [confirmPassword]);

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
                            value={confirmPassword}
                            onChange={(e)=>setconfirmPassword(e.target.value)}
                        ></input>
                        <p className="error">
                                {confirmPasswordError ? <errorMessage>{confirmPasswordError}</errorMessage> : ""}
                        </p> 
                    <div className="delete-button">
                    <Button color="#9CC094" text="탈퇴" link="/" size="20px" onClick={onClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delete 