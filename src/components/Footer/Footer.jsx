import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button/Button'
import Logo from '../../img/Logo.png'

import './Footer.scss'

const Footer = () => {
  return (  
    ReactDOM.createPortal(
      <>
        <div className="footer-menu-bar">
            <Button text="브랜드소개" color="#666666" size="14px"/>
            <Button text="이용약관" color="#666666" size="14px"/>
            <Button text="개인정보처리방침" color="#666666" size="14px"/>
            <Button text="입점/제휴문의" color="#666666" size="14px"/>
            <Button text="고객센터" color="#666666" size="14px"/>
        </div>
        <img className="logo" src={Logo} />
        <div className="footer-desc">
            <div className="footer-first-desc">
                <p>(주)와이즈푸드 | 대표: 강수홍 | 서울특별시 동대문구 서울시립대로 163</p>
                <p>개인정보관리책임자:홍길동 (gildong777@naver.com)</p>
                <p>통신판매업신고번호:제2021-서울시립-5761호</p>
                <p>사업자등록번호:472-66-00097</p>
            </div>
            <div className="footer-second-desc">
                <p>전화:1566-5761 / FAX:02-5490-4732</p>
                <p>E-mail:tnghd5761@gmail.com</p>
                <p>Copyright@스마트밀 All rights reserved</p>
            </div>
            <div className="footer-sns-desc">
                <p>SNS</p>
                <div className="footer-icons">
                    <i class="fab fa-instagram fa-2x"></i>
                    <i class="fab fa-facebook-square fa-2x"></i>
                    <i class="fab fa-twitter-square fa-2x"></i>
                    <i class="fab fa-youtube fa-2x"></i>
                </div>
            </div>
        </div>
      </>, document.querySelector('footer'))
  )
}

export default Footer