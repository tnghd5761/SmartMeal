import React from "react"

import './infoList.scss'

const infoList = (props) => {

    return (
        <div className="mypage-userinfo-list">
            <p className="nickname">닉네임: {props.name} </p>
            <p className="id">아이디(이메일): {props.id} </p>
        </div>
    )
}

export default infoList