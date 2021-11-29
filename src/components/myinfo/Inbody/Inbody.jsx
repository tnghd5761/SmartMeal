import React, { useState, useEffect, Component } from 'react';
import HighCharts from './High';
import Button from "../../Button/Button";
import './Inbody.scss'


function Inbody() {

    const [Health] = useState({
        info:[75, 150, 123]
    });

    return(
        <div className = "My-Inbody-info">
            <div className = "Inbody-title">
                <p>현재 나의 건강 상태</p>
                <div className = "Inbody-subtitle">
                    <p> - My Inbody Conditions -</p>
                </div>
            </div>
            <div className = "health-condition">
                <p> 당신은 현재 "표준체중 강인형" 입니다.</p>
                <div className = "health-chart">
                    <HighCharts Healthinfo = {Health.info} />
                </div>
            </div>
            <div className = "need-health">
                <p>당신에게 필요한 건강 성분</p>
                <div className = "need-health-point">
                    <p>: 적절한 탄수화물 + 고단백 + 저지방</p>
                </div>
            </div>
            <div className="health-update-button">
                <Button color="#9CC094" text="수정" link="/inbody/update"/>
            </div>
        </div>
    );
}

export default Inbody;
