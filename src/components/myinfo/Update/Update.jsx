import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";
import './Update.scss'

const Update = () => {
    const [user, setuser] = useState({
        name: '홍길동',
        id: 'ghdrlfehd1234@naver.com',
        password: '123456789',
        Confirmpw: '123456789'
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
                            <input className="new-data"
                                type="text"
                                placeholder="새로운 닉네임을 입력하시오."
                                name="name"
                                value={user.name}
                                onChange={onChange}
                            ></input>
                        </p>
                        <p className="new-id"> 아이디(이메일):
                            <input className="new-data"
                                type="text"
                                placeholder="새로운 ID을 입력하시오."
                                name="id"
                                value={user.id}
                                onChange={onChange}
                            ></input>
                        </p>
                        <p className="new-password">비밀번호:   
                            <input className="new-data"
                                type="password"
                                placeholder="숫자,영어,특수문자를 포함한 8자 이상 입력"
                                name="password"
                                value={user.password}
                                onChange={onChange}
                            ></input>
                        </p>   
                        <p className="confirmpassword">비밀번호 확인: 
                            <input className="new-data"
                                type="password"
                                placeholder="new PassWord를 확인하시오."
                                name="Confirmpw"
                                value={user.Confirmpw}
                                onChange={onChange}
                            ></input>
                        </p>      
                    </div>  
                    <div className="update-save-button">
                        <Button color="#9CC094" text="저장" link="/mypage" size="20px" onClick = {onClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update 