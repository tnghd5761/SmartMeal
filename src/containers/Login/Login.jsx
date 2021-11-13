import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { login, resetErrorSuccess } from "../../store/actions/userActions";
import { checkEmailValidation, checkUsernameValidation } from "../../utils/authUtils";

import './Login.scss'


const Login = ({history}) => {

    const [password, setPassword] = useState('')
    const [userInput, setUserInput] = useState('')
    const [modalOpen, setModalOpen] = useState('')
    const [formError, setFormError] = useState('')

    const dispatch = useDispatch()
    const { loading, success, error } = useSelector(state=>state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalOpen('open')
    
        let submittedUserData
       
        if(!checkEmailValidation(userInput)) {
            setFormError("올바른 이메일 형식이 아닙니다")
            return
        }

        submittedUserData = {
            user_id: userInput,
            password
        }
    
        if(!password) {
          setFormError("비밀번호를 입력하지 않으셨습니다")
          return
        }
        
    
        dispatch(login(submittedUserData))
        history.push('/')
    }

    const handleModalClick = () => {
        setModalOpen('close')
        dispatch(resetErrorSuccess())
        setTimeout(() => {
            setFormError(prevState => '')  
        }, 500);
    }

    return (
        <>
            {!loading && 
                <Modal
                    modalOpen={modalOpen}
                    buttonText="확인"
                    buttonSize="16px"
                    onClick={handleModalClick}
                    >
                    {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                    {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                </Modal>
            }
            <div className="login-container">
                <Block>
                    <form onSubmit={handleSubmit}>
                        <p className="login-desc">로그인</p>
                        <p className="login-sub-desc">회원 정보를 입력해주세요</p>
                        <div className="login-id-container">
                            <p className="id-password-desc">이메일</p>
                            <input 
                                type="text"
                                value={userInput}
                                spellCheck={false}
                                onChange={(e)=>setUserInput(e.target.value)}
                            />
                        </div>
                        <div className="login-password-container">
                            <p className="id-password-desc">비밀번호</p>
                            <input 
                                type="password"
                                value={password}
                                spellCheck={false}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-find-button">
                            <Button color="#9CC094" text="아이디(이메일)/비밀번호 찾기>" size="12px"/>
                        </div>
                        <div className="login-button">
                            <Button
                                type={(modalOpen==="open" || formError)? "" : "submit"}
                                text="로그인" 
                                size="22px" 
                                color="#ffffff"
                            />
                        </div>
                    </form>
                </Block>
            </div>
        </>
    )
}

export default Login