import React from "react";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";

import './Login.scss'

const Login = () => {
    return (
        <div className="login-container">
            <Block>
                <p className="login-desc">로그인</p>
                <p className="login-sub-desc">회원 정보를 입력해주세요</p>
                <div className="login-id-container">
                    <p className="id-password-desc">아이디(이메일)</p>
                    <input />
                </div>
                <div className="login-password-container">
                    <p className="id-password-desc">비밀번호</p>
                    <input />
                </div>
                <div className="login-find-button">
                    <Button color="#9CC094" text="아이디(이메일)/비밀번호 찾기>" size="11px"/>
                </div>
                <div className="login-button">
                    <Button text="로그인" size="22px" color="#ffffff"/>
                </div>
            </Block>
        </div>
    )
}

export default Login