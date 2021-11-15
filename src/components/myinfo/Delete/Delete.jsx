import React, { useState } from "react";
import Button from "../../Button/Button";
import './Delete.scss'

const Delete = () => {
    return (
        <div className="Check-container">
                <p className="mypage-desc">본인 확인 인증 </p>
                <div className="mypage-nickname-container">
                    <p className="nickname-desc">Check Your PassWord</p>
                    <input />
                </div>
                <div className="delete-button">
                    <Button color="#9CC094" text="탈퇴" link="/" size="12px"/>
                </div>
        </div>
    );
}

export default Delete