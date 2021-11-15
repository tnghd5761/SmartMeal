import React, { useState } from "react";
import Button from "../../Button/Button";
import './Update.scss'

const Update = () => {
    
    const [user, setuser] = useState({
        Nickname: '홍길동',
        ID: '홍길동123@naver.com',
        PW: '123456789',
        ConfirmPW: '123456789'
    });
    const { Nickname, ID, PW, ConfirmPW } = user;
    
    const onChange = (e) => {
        const nextForm = {
          ...user, // 기존의 값 복사 (spread operator)
          [e.target.name]: e.target.value, // 덮어쓰기
        };
        console.log(nextForm);
        setuser(nextForm);
    };
    
    return (
        <div className="update-container">
            
                <p className="mypage-title">My 회원정보 </p>
                <div className="mypage-userinfo">
                    <p className="nickname">기존 닉네임: {user.Nickname}</p> 
                    <p className="nickname">new 닉네임: 
                        <input 
                        type="text"
                        placeholder="새로운 닉네임을 입력하시오."
                        name="Nickname"
                        ></input>
                    </p>  
                </div>
                <div className="mypage-userinfo">
                    <p className="id">기존 ID: {user.ID}</p>
                    <p className="nickname">new ID: <input 
                        type="text"
                        placeholder="new ID를 입력하시오."
                        name="ID"
                        ></input>
                    </p>     
                </div>
                <div className="mypage-userinfo">
                    <p className="password">기존 PassWord: {user.PW}</p>
                    <p className="nickname">new PassWord: <input 
                        type="text"
                        placeholder="new PassWord를 입력하시오."
                        name="PW"
                        ></input>
                    </p>   
                    <p className="nickname">new PassWord 확인: <input 
                        type="text"
                        placeholder="new PassWord를 확인하시오."
                        name="ConfirmPW"
                        ></input>
                    </p>   
                </div>
                <div className="update-save-button">
                    <Button color="#9CC094" text="저장" link="/mypage" size="12px"/>
                </div>
        </div>
    )
}

export default Update