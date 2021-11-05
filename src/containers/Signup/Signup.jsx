import React from "react";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";
import './Signup.scss'

const Signup = () => {
    return (
        <div className="signup-container">
            <Block>
                <p className="signup-desc">회원가입</p>
                <p className="signup-sub-desc">회원 정보를 입력해주세요</p>
                <div className="signup-id-container">
                    <p className="id-password-desc">아이디(이메일)</p>
                    <Button text="중복확인" size="12px" color="#ffffff"/>
                </div>
                <input />
                <div className="signup-password-container">
                    <p className="id-password-desc">비밀번호</p>
                    <input placeholder="숫자 영어 특수문자를 포함한 8자 이상" />
                </div>
                <div className="signup-password-correction-container">
                    <p className="id-password-desc">비밀번호 확인</p>
                    <input />
                </div>
                <div className="signup-nickname-container">
                    <p className="id-password-desc">닉네임</p>
                    <Button text="중복확인" size="12px" color="#ffffff"/>
                </div>
                <input />
                <div className="signup-button">
                    <Button text="회원가입" size="22px" color="#ffffff"/>
                </div>
            </Block>
        </div>
    )
}

export default Signup