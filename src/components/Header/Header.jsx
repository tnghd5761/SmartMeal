import React from "react"
import Logo from '../../img/Logo.png'
import Button from "../Button/Button"

import './Header.scss'

const Header = () => {
    return (
        <div className="header-component">
            <div className="header-first-section">
                <div className="header-logo-search">
                    <Button link="/" text={<img className="logo" src={Logo} />} />
                    <div class="search">
                        <input type="text" placeholder="상품 검색"/>
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            <div>
            <div className="header-second-section">
                    <Button text="로그인" link="/login" size="13px" color="#666666"/>
                    <Button text="회원가입" link="/signup" size="13px" color="#666666"/>
                    <Button text="장바구니" size="13px" color="#666666"/>
                    <Button text="마이페이지" size="13px" color="#666666"/>
                </div>
            </div>
            </div>
            <div className="header-menu-bar">
                <Button text="브랜드" color="#666666" size="20px"/>
                <Button text="체성분" color="#666666" size="20px"/>
                <Button text="상품소개" color="#666666" size="20px"/>
                <Button text="이벤트" color="#666666" size="20px"/>
                <Button text="마이페이지" color="#666666" size="20px"/>
                <Button text="고객센터" color="#666666" size="20px"/>
            </div>
        </div>
    )
}

export default Header