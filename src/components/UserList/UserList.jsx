import React from "react"
import { useDispatch } from "react-redux"
// import { deleteUser } from "../../store/actions/userActions"

import './UserList.scss'

const UserList = (props) => {

    const dispatch = useDispatch()
    
    // const handleDeleteUser = (name) => {
    //     dispatch(deleteCart(name))
    // }


    return (
        <div className="mypage-userinfo-list">
            <p className="nickname">닉네임: {props.name} </p>
            <p className="id">아이디(이메일): {props.id} </p>
        </div>
    )
}

export default UserList