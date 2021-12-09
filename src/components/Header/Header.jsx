import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Logo from '../../img/Logo.png'
import { logout } from "../../store/actions/userActions"
import Button from "../Button/Button"


import './Header.scss'

const Header = () => {

    const { isLogin } = useSelector(state=>state.user)
    
    const dispatch = useDispatch()


    const handleLogout = () => {
        dispatch(logout())
    }


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
                    {isLogin?<Button text="로그아웃" size="13px" color="#666666" onClick={handleLogout}/>:<Button text="로그인" link="/login" size="13px" color="#666666"/>}
                    {!isLogin&&<Button text="회원가입" link="/signup" size="13px" color="#666666"/>}
                    {isLogin&&<Button link="/mycart" text="장바구니" size="13px" color="#666666"/>}
                    {isLogin&&<Button link="/mypage" text="마이페이지" size="13px" color="#66666"/>}
                </div>
            </div>
            </div>
            <div className="header-menu-bar">
                <Button text="브랜드" color="#666666" size="20px"/>
                <Button text="체성분" link="/inbody" color="#666666" size="20px"/>
                <Button text="상품소개" link="/list" color="#666666" size="20px"/>
                <Button text="이벤트" color="#666666" size="20px"/>
                <Button text="마이페이지" color="#666666" size="20px"/>
                <Button text="고객센터" color="#666666" size="20px"/>
            </div>
        </div>
    )
}

export default Header