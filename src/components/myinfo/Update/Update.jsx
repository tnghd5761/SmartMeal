import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Modal/Modal.jsx";
import { checkIsDuplicateUsername} from "../../../store/actions/userActions.js";

import './Update.scss'

const Update = ({history}) => {
    // const [user, setuser] = useState({
    //     Nickname: '홍길동',
    //     ID: 'ghdrlfehd1234@naver.com',
    //     PW: '123456789',
    //     ConfirmPW: '123456789'
    // });
    
    const [name, setname] = useState('')
    const [email, setemaill] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
        nameError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    const [modalOpen, setModalOpen] = useState('close')
    const [formError, setFormError] = useState('')

    const { loading, success, error, isUsernameDupChecked } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const { nameError, passwordError, confirmPasswordError } = errorMessage;

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
          setErrorMessage({
            ...errorMessage,
            nameError: "",
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            nameError: "올바른 닉네임 형식이 아닙니다",
          });
        }
    }, [name]);
    
    /* 비밀번호 체크 */
    useEffect(() => {
        if (validationCheck(password, inputRegexs.passwordReg) && password !== "") {
          setErrorMessage({
            ...errorMessage,
            passwordError: "",
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            passwordError:
              "비밀번호는 숫자, 영어, 특수문자를. 포함하며 8자 이상이어야 합니다",
          });
        }
    }, [password]);
      
    /* 비밀번호 확인 체크 */
    useEffect(() => {
        if (password === confirmPassword && confirmPassword !== "") {
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "",
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "비밀번호 확인이 일치하지 않습니다.",
          });
        }
      }, [confirmPassword]);

      const checkDupUsername = () => {
        setModalOpen('open')
        dispatch(checkIsDuplicateUsername(name))
      }
    
      const onUpdate = () => {
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
          return
        }

        const updateUserData = {
            user_name: name,
            user_id: email,
            password: password,
        }
    
        dispatch(onUpdate(updateUserData));

        alert("회원 정보 수정 완료");
        history.push("/mypage");
      }

    // const onChange = (e) => {
    //     const nextuser = {
    //       ...user, // 기존의 값 복사 (spread operator)
    //       [e.target.name]: e.target.value, // 덮어쓰기
    //     };
    //     setuser(nextuser);
    // };

    // const onClick = (e) => {
    //     alert('저장하시겠습니까?');
    //     setuser({[e.target.name]: e.target.value
    //     });
    // };

    return (
      <>
        {!loading &&
        <Modal
          modalOpen={modalOpen}
          buttonText="확인"
          buttonSize="16px"
          // onClick={handleModalClick}
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
                <p className="mypage-staus">내 회원정보 수정</p>
                <div className="mypage-info">
                    <div className="mypage-userinfo">
                        <p className="nickname">닉네임: 
                            <input className="new-data"
                                type="text"
                                placeholder="새로운 닉네임을 입력하시오."
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
                            ></input>
                            <Button text="중복확인" size="12px" color="#ffffff" onClick={checkDupUsername} />
                            <p className="error">
                                {nameError ? <errorMessage>{nameError}</errorMessage> : ""}
                            </p>
                        </p>
                        <p className="new-id"> 아이디(이메일): {email} </p>
                        <p className="new-password">비밀번호:   
                            <input className="new-data"
                                type="password"
                                placeholder="숫자,영어,특수문자를 포함한 8자 이상 입력"
                                value={password}
                                onChange={(e)=>setpassword(e.target.value)}
                            ></input>
                            <p className="error">
                                {passwordError ? <errorMessage>{passwordError}</errorMessage> : ""} 
                            </p>
                        </p> 
                        <p className="confirmpassword">비밀번호 확인: 
                            <input className="new-data"
                                type="password"
                                placeholder="new PassWord를 확인하시오."
                                value={confirmPassword}
                                onChange={(e)=>setconfirmPassword(e.target.value)}
                            ></input>
                            <p className="error">
                                {confirmPasswordError ? <errorMessage>{confirmPasswordError}</errorMessage> : ""}
                            </p> 
                        </p>  
                    </div>  
                    <div className="update-save-button">
                        <Button color="#9CC094" text="저장" size="20px" onClick={onUpdate}/>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Update 