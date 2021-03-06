import React, { useState, useEffect, useCallback } from "react";
import Button from '../../components/Button/Button'
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal.jsx";
import { checkIsDuplicateUsername, resetErrorSuccess, resetUsernameDuplicateCheck } from "../../store/actions/userActions.js";
import { info, infoUpdate } from "../../store/actions/userActions"

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
    }, [user.user_name]);

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
            nameError: "????????? ????????? ????????? ????????????",
          });
        }
    }, [name]);
    
    /* ???????????? ?????? */
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
              "??????????????? ??????, ??????, ???????????????. ???????????? 8??? ??????????????? ?????????",
          });
        }
    }, [password]);
      
    /* ???????????? ?????? ?????? */
    useEffect(() => {
        if (password === confirmPassword && confirmPassword !== "") {
          seterrorMessage({
            ...errorMessage,
            confirmPasswordError: "",
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            confirmPasswordError: "???????????? ????????? ???????????? ????????????.",
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
          alert("?????? ?????? ???????????? ??????????????????");
          return;
        }
    
        if (nameError) {
          alert("???????????? ????????? ?????? ????????????");
          return;
        } else if (passwordError) {
            alert("??????????????? ????????? ?????? ????????????");
            return;
        } else if (confirmPasswordError) {
            alert("???????????? ????????? ???????????? ????????????.");
            return;
        } else if(!isUsernameDupChecked) {
            alert("????????? ???????????????. ?????? ??????????????????")
          return;
        }

        
        const updateUserData = {
            user_name: name,
            user_id: email,
            password: password,
        }
    
        dispatch(infoUpdate(updateUserData));

        alert("?????? ?????? ?????? ??????");
        history.push('/mypage');
      }

      const handleModalClick = () => {
        if(success === '?????????????????????') {
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
          buttonText="??????"
          buttonSize="16px"
          onClick={handleModalClick}
          >
          {success && success.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
          {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
          {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
        </Modal>
        }
        <div className="update-container">
			<div className="mypage-title">
				<p>?????? ?????????</p>
			</div>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="?????? ??????" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="?????? ??????" link="/mypage/delete" size="20px"/>
            </div>
            <div className= "mypage-update-component">
              <p> ??? ???????????? ??????</p>
                <div className="mypage-userinfo">
                  <div className = "name_info">
                    <div className="name">
                      <p>?????????: </p>
                      <input className="new-name"
                        type="text"
                        placeholder="????????? ???????????? ???????????????."
                        value={name}
                        onChange={handleUserInputChange}
                      ></input>
                      <Button text="????????????" size="12px" color="#ffffff" onClick={checkDupUsername} />
                    </div>
                    <p className="error">
                      {nameError ? <errorMessage>{nameError}</errorMessage> : ""} 
                    </p>
                  </div>
                  <div className = "id_info">
                    <div className="id">
                      <p>?????????(?????????): </p>
                      <div className= "id_text">
                        <p> {user.user_id}</p>
                      </div>
                    </div>
                  </div>
                  <div className = "password_info">
                    <div className="password">
                      <p>????????????: </p>
                      <input className="new-password"
                        type="password"
                        placeholder="??????,??????,??????????????? ????????? 8??? ?????? ??????"
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
                      <p>???????????? ??????: </p>
                      <input className="new-confirmpassword"
                        type="password"
                        placeholder="new PassWord??? ???????????????."
                        value={confirmPassword}
                        onChange={(e)=>setconfirmPassword(e.target.value)}
                      ></input>
                    </div>
                    <p className="error">
                      {confirmPasswordError ? <errorMessage>{confirmPasswordError}</errorMessage> : ""}
                    </p>
                  </div>
                  <div className="update-save-button">
                    <Button color="#9CC094" text="??????" size="20px" onClick={()=>onUpdate(name,user.user_id,password,confirmPassword)}/>
                  </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Update 