import React, { useState } from "react";
import { useSelector } from "react-redux";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";
import './Signup.scss'

import { checkEmailValidation, checkPasswordValidation, checkUsernameValidation } from '../../utils/authUtils'
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { checkIsDuplicateEmail, checkIsDuplicateUsername, creditRegister, resetEmailDuplicateCheck, resetErrorSuccess, resetUsernameDuplicateCheck, signup } from "../../store/actions/userActions";

const Signup = ({history}) => {

    const [isFirstTermToggle, setIsFirstTermToggle] = useState(false)
    const [isSecondTermToggle, setIsSecondTermToggle] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [term,setTerm] = useState(false)
    const [confirmPassword, setconfirmPassword] = useState('')
    const [formError, setFormError] = useState('')
    const [modalOpen, setModalOpen] = useState('close')

    const { loading, success, error, isEmailDupChecked, isUsernameDupChecked } = useSelector(state=>state.user)

    const dispatch = useDispatch()

    const checkDupEmail = () => {
        setModalOpen('open')
        if(!checkEmailValidation(email)) {
          setFormError("올바른 이메일 형식이 아닙니다")
          return
        }
        dispatch(checkIsDuplicateEmail(email))
    }

    const checkDupUsername = () => {
        setModalOpen('open')
        if(!checkUsernameValidation(username)) {
          setFormError("올바른 닉네임 형식이 아닙니다")
          return
        }
        dispatch(checkIsDuplicateUsername(username))
    }


    const handleFirstTermToggleShow = (prev) => {
        setIsFirstTermToggle(prev=>!prev)
    }

    const handleSecondTermToggleShow = (prev) => {
        setIsSecondTermToggle(prev=>!prev)
    }

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value)
        dispatch(resetEmailDuplicateCheck())
    }

    const handleUserInputChange = (e) => {
        setUsername(e.target.value)
        dispatch(resetUsernameDuplicateCheck())
    }

    const handleTermChecked = (e) => {
        setTerm(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalOpen('open')
        if(!isEmailDupChecked) {
          setFormError("이메일 중복확인을. 하지 않으셨습니다")
          return
        }
        if(!isUsernameDupChecked) {
          setFormError("닉네임 중복확인을. 하지 않으셨습니다")
          return
        }
        if(!term){
            setFormError("약관에 동의를. 하지 않으셨습니다")
            return
        }
        if(!checkPasswordValidation(password)){
          setFormError("비밀번호는 숫자, 영어, 특수문자를. 포함하며 8자 이상이어야 합니다")
          return
        }
        if(password !== confirmPassword) {
          setFormError("비밀번호와 비밀번호확인 값이. 일치하지 않습니다")
          return
        }
    
        const submittedUserData = {
            user_name: username,
            user_id: email,
            password,
        }
    
        dispatch(signup(submittedUserData))
        dispatch(creditRegister(username,email))

      }

    const handleModalClick = () => {
        if(success === '입력하신 이메일로. 인증링크를 보내드렸습니다') {
            dispatch(resetErrorSuccess())
            history.push('/')
            return
        } 
    
        setModalOpen(prevState => 'close')
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
                {success && success.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
            </Modal>
            }
            <div className="signup-container">
                <Block>
                    <form onSubmit={handleSubmit}>
                        <p className="signup-desc">회원가입</p>
                        <p className="signup-sub-desc">회원 정보를 입력해주세요</p>
                        <div className="signup-id-container">
                            <p className="id-password-desc">이메일</p>
                            <Button text="중복확인" size="12px" color="#ffffff" onClick={checkDupEmail} />
                        </div>
                        <input 
                            type="text"
                            value={email}
                            spellCheck={false}
                            onChange={handleEmailInputChange}
                        />
                        <div className="signup-password-container">
                            <p className="id-password-desc">비밀번호</p>
                            <input
                                type="password" 
                                value={password}
                                spellCheck={false}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="숫자 영어 특수문자를 포함한 8자 이상" 
                            />
                        </div>
                        <div className="signup-password-correction-container">
                            <p className="id-password-desc">비밀번호 확인</p>
                            <input 
                                type="password"
                                value={confirmPassword}
                                spellCheck={false}
                                onChange={(e)=>setconfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="signup-nickname-container">
                            <p className="id-password-desc">닉네임</p>
                            <Button text="중복확인" size="12px" color="#ffffff" onClick={checkDupUsername} />
                        </div>
                        <input 
                            type="text"
                            value={username}
                            spellCheck={false}
                            onChange={handleUserInputChange}
                        />
                        <div className="signup-first-term">
                            <input 
                                type="checkbox" 
                                onChange={handleTermChecked}
                            />
                            <p>[필수] 회원가입 약관동의</p>
                            {!isFirstTermToggle?<i onClick={handleFirstTermToggleShow} class="fas fa-search-plus"></i>:
                            <i onClick={handleFirstTermToggleShow} class="fas fa-search-minus"></i>}
                        </div>
                        {isFirstTermToggle&&<Block color="#ffffff">
                            <p>약관 추가 예정</p>
                        </Block>}
                        <div className="signup-second-term">
                            <input type="checkbox" />
                            <p>[필수] 개인정보처리방침 동의</p>
                            {!isSecondTermToggle?<i onClick={handleSecondTermToggleShow} class="fas fa-search-plus"></i>:
                            <i onClick={handleSecondTermToggleShow} class="fas fa-search-minus"></i>}
                        </div>
                        {isSecondTermToggle&&<Block color="#ffffff">
                            <p>약관 추가 예정</p>
                        </Block>}
                        <div className="signup-button">
                            <Button 
                                text="회원가입" 
                                size="22px" 
                                color="#ffffff"
                                type={(modalOpen==="open" || formError)? "" : "submit"}      
                            />
                        </div>
                    </form>
                </Block>
            </div>
        </>
    )
}

export default Signup