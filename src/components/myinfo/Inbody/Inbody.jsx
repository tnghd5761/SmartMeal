import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux"
import HighCharts from './High';
import Button from "../../Button/Button";
import { info } from "../../../store/actions/userActions"

import './Inbody.scss'


function Inbody({history}) {

    const dispatch = useDispatch()

    const { isLogin, user, userListLoading } = useSelector(state=>state.user)

    const [Health, setHealth] = useState({
        data:[]
    });

    const [HealthMessage, setHealthMessage] = useState({
        typemessage: "",
    });
    
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

    useEffect(() => {
        setHealth({
            ...Health,
            data: [user.weight, user.muscle, user.fat],
          });
    }, [user.weight, user.muscle, user.fat]);

    const [inputType] = useState({
        inbodyType1: "저체중 허약형",
        inbodyType2: "과체중 비만형",
    });

    useEffect(() => {
        if (user.inbody_type === inputType.inbodyType1) {
          setHealthMessage({
            ...HealthMessage,
            typemessage: "적당한 포만감을 주는 양의 건강한 일반식을 4시간마다 섭취",
          });
        } else if(user.inbody_type === inputType.inbodyType2){
          setHealthMessage({
            ...HealthMessage,
            typemessage: "저탄수화물+고단백+저지방",
          });
        } else {
            setHealthMessage({
              ...HealthMessage,
              typemessage: "적절한 탄수화물+고단백+저지방",
            });
        }
    }, [user.inbody_type]);

    return(
        <div className = "My-Inbody-info">
            <div className = "Inbody-title">
                <p>현재 나의 건강 상태</p>
                <div className = "Inbody-subtitle">
                    <p> - My Inbody Conditions -</p>
                </div>
            </div>
            <div className = "health-condition">
                <p> 당신은 현재 "{user.inbody_type}" 입니다.</p>
                <div className = "health-chart">
                    <HighCharts Healthinfo = {Health.data}   />
                </div>
            </div>
            <div className = "need-health">
                <p>당신에게 필요한 건강 성분</p>
                <div className = "need-health-point">
                    : {HealthMessage.typemessage}
                </div>
            </div>
            <div className="health-update-button">
                <Button color="#9CC094" text="수정" link="/inbody/update"/>
            </div>
        </div>
    );
}

export default Inbody;
