import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Modal/Modal.jsx";
import { checkIsDuplicateUsername, resetErrorSuccess, resetUsernameDuplicateCheck } from "../../../store/actions/userActions.js";
import { info, infoUpdate } from "../../../store/actions/userActions"

import './Update.scss'

const Update = ({history}) => {
    
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState({
        nameError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    const [modalOpen, setModalOpen] = useState('close')
    const [formError, setFormError] = useState('')

    const { loading, success, error, isUsernameDupChecked, userListLoading, user} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const { nameError, passwordError, confirmPasswordError } = errorMessage;

    useEffect(()=>{
      if(!userListLoading){
          dispatch(info())
      }
    },[])
    
    useEffect(() => {
      setname(user.user_name)
      setpassword(user.password)
    }, [user.user_name, user.password]);

    const inputRegexs = {
        nameReg: /[~!@#$%^&*()_+|<>?:{}]/,
        passwordReg: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
    };

    const validationCheck = useCallback(
        (input, regex) => {
          let isValidate = false;
          if (input === "") {
            isValidate = false;
          } else if (regex.test(input)) {
            isValidate = true;
          } else {
            isValidate = false;
          }
          return isValidate;
        },
        [name, password]
    );

    useEffect(() => {
        if (!(validationCheck(name, inputRegexs.nameReg) || name === "")) {
          seterrorMessage({
            ...errorMessage,
            nameError: "",
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            nameError: "올바른 닉네임 형식이 아닙니다",
          });
        }
    }, [name]);
    
    /* 비밀번호 체크 */
    useEffect(() => {
        if (validationCheck(password, inputRegexs.passwordReg) && password !== "") {
          seterrorMessage({
            ...errorMessage,
            passwordError: "",
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            passwordError:
              "비밀번호는 숫자, 영어, 특수문자를. 포함하며 8자 이상이어야 합니다",
          });
        }
    }, [password]);
      
    /* 비밀번호 확인 체크 */
    useEffect(() => {
        if (password === confirmPassword && confirmPassword !== "") {
          seterrorMessage({
            ...errorMessage,
            confirmPasswordError: "",
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            confirmPasswordError: "비밀번호 확인이 일치하지 않습니다.",
          });
        }
      }, [confirmPassword]);

      const checkDupUsername = () => {
        setModalOpen('open')
        dispatch(checkIsDuplicateUsername(name))
      }

      const handleUserInputChange = (e) => {
        setname(e.target.value)
        dispatch(resetUsernameDuplicateCheck())
      }
    
      const onUpdate = ( name, email, password, confirmPassword) => {
        if (!name || !password || !confirmPassword) {
          alert("모든 값을 정확하게 입력해주세요");
          return;
        }
    
        if (nameError) {
          alert("닉네임이 형식에 맞지 않습니다");
          return;
        } else if (passwordError) {
            alert("비밀번호가 형식에 맞지 않습니다");
            return;
        } else if (confirmPasswordError) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            return;
        } else if(!isUsernameDupChecked) {
          setFormError("닉네임 중복확인을. 하지 않으셨습니다")
          return;
        }

        
        const updateUserData = {
            user_name: name,
            user_id: email,
            password: password,
        }
    
        dispatch(infoUpdate(updateUserData));

        alert("회원 정보 수정 완료");
        history.push('/mypage');
      }

      const handleModalClick = () => {
        if(success === '확인되었습니다') {
          dispatch(resetErrorSuccess())
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
        <div className="navbar-container">
          <p classname="mypage-title">마이 페이지</p>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>
            <div className= "mypage-update-component">
              <p> 내 회원정보 수정</p>
                <div className="mypage-userinfo">
                  <div className = "name_info">
                    <div className="name">
                      <p>닉네임: </p>
                      <input className="new-name"
                        type="text"
                        placeholder="새로운 닉네임을 입력하시오."
                        value={name}
                        onChange={handleUserInputChange}
                      ></input>
                      <Button text="중복확인" size="12px" color="#ffffff" onClick={checkDupUsername} />
                    </div>
                    <p className="error">
                      {nameError ? <errorMessage>{nameError}</errorMessage> : ""} 
                    </p>
                  </div>
                  <div className = "id_info">
                    <div className="id">
                      <p>아이디(이메일): </p>
                      <div className= "id_text">
                        <p> {user.user_id}</p>
                      </div>
                    </div>
                  </div>
                  <div className = "password_info">
                    <div className="password">
                      <p>비밀번호: </p>
                      <input className="new-password"
                        type="password"
                        placeholder="숫자,영어,특수문자를 포함한 8자 이상 입력"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                      ></input>
                    </div>
                    <p className="error">
                      {passwordError ? <errorMessage>{passwordError}</errorMessage> : ""} 
                    </p>
                  </div>
                  <div className = "confirmpassword_info">
                    <div className="confirmpassword">
                      <p>비밀번호 확인: </p>
                      <input className="new-confirmpassword"
                        type="password"
                        placeholder="new PassWord를 확인하시오."
                        value={confirmPassword}
                        onChange={(e)=>setconfirmPassword(e.target.value)}
                      ></input>
                    </div>
                    <p className="error">
                      {confirmPasswordError ? <errorMessage>{confirmPasswordError}</errorMessage> : ""}
                    </p>
                  </div>
                  <div className="update-save-button">
                    <Button color="#9CC094" text="저장" size="20px" onClick={()=>onUpdate(name,user.user_id,password,confirmPassword)}/>
                  </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Update 