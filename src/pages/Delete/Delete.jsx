import React, { useState, useEffect } from "react";
import Button from '../../components/Button/Button'
import { useSelector, useDispatch } from "react-redux";
import { info, infoDelete, logout } from "../../store/actions/userActions"

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

    const onDelete = (password, confirmPassword) => {
        if(password === confirmPassword && confirmPassword !== ""){
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요')
            return;
        }

        const deleteUserData = {
            password: confirmPassword,
        }
    
        dispatch(infoDelete(deleteUserData));

        dispatch(logout())

        alert('회원탈퇴가 완료되었습니다.');
        history.push('/');
    };

    return (
        <div className="delete-container">
            <div className="mypage-title">
				<p>마이 페이지</p>
			</div>
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
					<input className="check-password"
						type="password"
						placeholder="PassWord을 입력하시오."
						value={confirmPassword}
						onChange={(e)=>setconfirmPassword(e.target.value)}
					/>
                    <div className="delete-button">
                        <Button color="#9CC094" text="탈퇴" size="20px" onClick={()=>onDelete(user.user_password, confirmPassword)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delete 