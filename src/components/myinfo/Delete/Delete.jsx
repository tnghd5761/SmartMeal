import React, { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { info, infoDelete } from "../../../store/actions/userActions"

import './Delete.scss'

const Delete = ({history}) => {
    const [confirmPassword, setconfirmPassword] = useState('')
    const dispatch = useDispatch()

    const { isLogin, user, userListLoading} = useSelector(state=>state.user)

    useEffect(()=>{
        if(!isLogin){
           history.push('/')
        }
    })

    useEffect(()=>{
        if(!userListLoading){
            dispatch(info())
        }
    },[])

    // const [errorMessage, setErrorMessage] = useState({
    //     confirmPasswordError: "",
    // });
    
    // const { confirmPasswordError } = errorMessage;


    // useEffect(() => {
    //     if (password === confirmPassword && confirmPassword !== "") {
    //       setErrorMessage({
    //         ...errorMessage,
    //         confirmPasswordError: "",
    //       });
    //     } else {
    //       setErrorMessage({
    //         ...errorMessage,
    //         confirmPasswordError: "비밀번호가 일치하지 않습니다.",
    //       });
    //     }
    // }, [confirmPassword]);

    const onDelete = (password, confirmPassword) => {
        if(password === confirmPassword && confirmPassword !== ""){
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요')
        }

        const deleteUserData = {
            password: confirmPassword,
        }
    
        dispatch(infoDelete(deleteUserData));

        alert('정말 탈퇴하시겠습니까?');
    };

    return (
        <div className="navbar-container">
            <p classname="mypage-title">마이 페이지</p>
            <div className="mypage-menu">
                <Button color="#1FAB89" text="회원 정보" link="/mypage" size="20px"/>
                <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
            </div>
            <div className= "mypage-delete-component">
                <p className="mypage-staus">회원 탈퇴</p>
                <div className="check-userinfo">
                    <p className="user-prove">본인 확인 인증 </p>
                    <div className="check-pw">
                        <p>-Check Your PassWord-</p>
                    </div>
                        <input className="new-data"
                            type="password"
                            placeholder="PassWord을 입력하시오."
                            value={confirmPassword}
                            onChange={(e)=>setconfirmPassword(e.target.value)}
                        ></input>
                    <div className="delete-button">
                        <Button color="#9CC094" text="탈퇴" link="/" size="20px" onClick={()=>onDelete(user.user_password, confirmPassword)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delete 