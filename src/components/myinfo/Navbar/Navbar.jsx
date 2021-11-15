import React from "react";
import Button from "../../Button/Button";

import './Navbar.scss'

function Navbar() {

  return (
    <div className="navbar-container">
      <p classname="mypage-title">마이 페이지</p>
        <div className="mypage-menu">
          <Button color="#1FAB89" text="회원 정보" link="/mypage/update" size="20px"/>
          <Button color="#1FAB89" text="회원 탈퇴" link="/mypage/delete" size="20px"/>
        </div>
    </div>
    );
}

export default Navbar;