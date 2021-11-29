import React, { useState, Component } from 'react';
import Button from "../../Button/Button";
import './Hupdate.scss'

function Hupdate (props){
    const [Health, setHealth] = useState({
        birth:props.Health. birth,
        gender:props.Health.gender,
        height:props.Health.height,
        weight: props.Health.weight,
        muscle: props.Health.muscle,
        fat: props.Health.fat
    });

    const onChange = e => {
        const nextHealth = {
            ...Health, // 기존 값 복사
            [e.target.name]: e.target.value // 이 자리에 덮어 씌우기
        }
        setHealth(nextHealth);
    }

    const onClick = e => {
        alert('저장하시겠습니까?');
        setHealth({
            [e.target.name]: e.target.value
        });
    };

    return(
        <div className = "health-insert-update">
            <p className="new-birth"> 생년월일:
                <input className="new-data"
                    type="text"
                    placeholder="ex)970304" 
                    name="birth"
                    value={Health.birth}
                    onChange={onChange}
                ></input>
            </p>     
            <p className="new-gender"> 성별:
                <input className="new-data"
                    type="text"
                    placeholder="ex) 남자 or 여자"
                    name="gender"
                    value={Health.gender}
                    onChange={onChange}
                ></input>
            </p>     
            <p className="new-height"> 키(cm):  
                <input className="new-data"
                    type="text"
                    placeholder="키를 입력하시오."
                    name="height"
                    value={Health.height}
                    onChange={onChange}
                ></input>
            </p> 
            <p className="new-weight"> 체중(kg):  
                <input className="new-data"
                    type="text"
                    placeholder="체중을 입력하시오."
                    name="weight"
                    value={Health.weight}
                    onChange={onChange}
                ></input>
            </p>         
            <p className="new-muscle"> 골격근량(kg):
                <input className="new-data"
                    type="text"
                    placeholder="골격근량을 입력하시오."
                    name="muscle"
                    value={Health.muscle}
                    onChange={onChange}
                ></input>
            </p>     
            <p className="new-fat"> 체지방률(%):
                <input className="new-data"
                    type="text"
                    placeholder="체지방률을 입력하시오."
                    name="fat"
                    value={Health.fat}
                    onChange={onChange}
                ></input>
            </p>
            <div className="health-save-button">
                <Button color="#9CC094" text="저장" size="26px" onClick = {onClick}/>
                <Button color="#9CC094" text="분석" link="/inbody"/>
            </div>     
        </div>
    );
}

export default Hupdate;