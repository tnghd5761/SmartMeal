import React, { useState } from "react";
import Button from "../../Button/Button";
import './Update.scss'

const Update = () => {
    const [user, setuser] = useState({
        Nickname: '홍길동',
        ID: 'dlrkdtks1004@naver.com',
        PW: '123456789',
        ConfirmPW: '123456789'
    });

    const onChange = (e) => {
        const nextuser = {
          ...user, // 기존의 값 복사 (spread operator)
          [e.target.name]: e.target.value, // 덮어쓰기
        };
        setuser(nextuser);
    };

    const onClick = (e) => {
        alert('저장하시겠습니까?');
        setuser({[e.target.name]: e.target.value
        });
    };

    return (
        <div className="navbar-container">
            <p classname="mypage-title">마이 페이지</p>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>
            <div className= "mypage-update-component">
                <p className="mypage-staus">내 회원정보 수정</p>
                <div className="mypage-info">
                    <div className="mypage-userinfo">
                        <p className="nickname">닉네임:  
                            <input 
                                type="text"
                                placeholder="새로운 닉네임을 입력하시오."
                                name="Nickname"
                                value={user.Nickname}
                                onChange={onChange}
                            ></input>
                        </p>  
                    </div>
                    <div className="mypage-userinfo">
                        <p className="new-id"> 아이디:
                            <input 
                                type="text"
                                placeholder="새로운 ID을 입력하시오."
                                name="ID"
                                value={user.ID}
                                onChange={onChange}
                            ></input>
                        </p>     
                    </div>
                    <div className="mypage-userinfo">
                        <p className="new-password">비밀번호:   
                            <input 
                                type="text"
                                placeholder="new PassWord를 입력하시오."
                                name="PW"
                                value={user.PW}
                                onChange={onChange}
                            ></input>
                        </p>   
                        <p className="confirmpassword">비밀번호 확인: 
                            <input 
                                type="text"
                                placeholder="new PassWord를 확인하시오."
                                name="ConfirmPW"
                                value={user.ConfirmPW}
                                onChange={onChange}
                            ></input>
                        </p>   
                    </div>
                    <div className="update-save-button">
                        <Button color="#9CC094" text="저장" link="/mypage" size="25px" onClick = {onClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update 