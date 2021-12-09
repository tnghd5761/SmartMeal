import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { info, inbodyUpdate } from "../../store/actions/userActions"
import Button from '../../components/Button/Button'

import './insertHealth.scss'

function InsertHelalth ({history}){
    const dispatch = useDispatch()

    const { userListLoading, user} = useSelector(state=>state.user)

    const [birth, setbirth] = useState('')
    const [gender, setgender] = useState('')
    const [height, setheight] = useState()
    const [weight, setweight] = useState()
    const [muscle, setmuscle] = useState()
    const [fat, setfat] = useState()

    useEffect(()=>{
        if(!userListLoading){
            dispatch(info())
        }
    },[])

    useEffect(()=>{
        setbirth(user.birth)
        setgender(user.gender)
        setheight(user.height)
        setweight(user.weight)
        setmuscle(user.muscle)
        setfat(user.fat)
    },[user.birth, user.gender, user.height, user.weight, user.muscle, user.fat])


    const oninbodyUpdate = (birth, gender, height, weight, muscle, fat )=> {
        if (!birth || !gender || !height || !weight || !muscle || !fat) {
            alert("모든 값을 정확하게 입력해주세요");
            return;
        }

        const updateInbody = {
            birth: birth,
            gender: gender,
            height: height,
            weight: weight,
            muscle: muscle,
            fat: fat,

        }
        
        dispatch(inbodyUpdate(updateInbody));

        alert('저장하시겠습니까?');
        history.push('/inbody');
    };


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
                <div className = "health-insert-update">
                    <div className="info_birth">
                        <p className="info_subtitle">생년월일 :</p>
                        <input className="birth-data"
                            type="Date"
                            value={birth}
                            onChange={(e)=>setbirth(e.target.value)}
                        ></input>
                    </div>
                    <div className="info_gender">
						<p className="info_subtitle">성별 :</p>
                        <input className="gender-data"
                            type="text"
                            placeholder="ex) 남자 or 여자"
                            value={gender}
                            onChange={(e)=>setgender(e.target.value)}
                        ></input>
                    </div>  
                    <div className="info_height">
                        <p className="info_subtitle">키(cm) :</p>
                        <input className="height-data"
                            type="text"
                            placeholder="키를 입력하시오."
                            value={height}
                            onChange={(e)=>setheight(e.target.value)}
                        ></input>
                    </div>  
                    <div className="info_weight">
                        <p className="info_subtitle">체중(kg) :</p>
                        <input className="weight-data"
                            type="text"
                            placeholder="체중을 입력하시오."
                            value={weight}
                            onChange={(e)=>setweight(e.target.value)}
                        ></input>
                    </div>  
                    <div className="info_muscle">
                        <p className="info_subtitle">골격근량(kg) :</p>
                        <input className="muscle-data"
                            type="text"
                            placeholder="골격근량을 입력하시오."
                            value={muscle}
                            onChange={(e)=>setmuscle(e.target.value)}
                        ></input>
                    </div> 
                    <div className="info_fat">
                        <p className="info_subtitle">체지방률(%) :</p>
                        <input className="fat-data"
                            type="text"
                            placeholder="체지방률을 입력하시오."
                            value={fat}
                            onChange={(e)=>setfat(e.target.value)}
                        ></input>
                    </div>   
                    <div className="health-save-button">
                        <Button color="#9CC094" text="저장" size="26px" onClick = {()=>oninbodyUpdate(birth, gender, height, weight, muscle, fat)}/>
                    </div>     
                </div>
            </div>
        </div>
    );
}

export default InsertHelalth;