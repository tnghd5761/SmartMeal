import React, { useState, Component } from 'react';
import Hupdate from './Hupdate';

import './insertHealth.scss'

function InsertHelalth (){

    const [Health] = useState({
        birth: '990517',
        gender: '남자',
        stature: 178,
        weight: 75,
        skeletal: 150,
        fat: 123
    });

    return(
        <div className = "My-Inbody-info">
            <div className = "Inbody-title">
                <p>현재 나의 건강 상태</p>
                <div className = "Inbody-subtitle">
                    <p> - My Inbody Insert -</p>
                </div>
                <div className = "health-insert">
                    <p>건강 정보 입력 및 수정</p>
                </div>
            </div>
            <div className = "Inbody-update">
                < Hupdate Health = {Health} />
            </div>
        </div>
    );
}

export default InsertHelalth;