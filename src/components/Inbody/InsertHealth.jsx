import React, { useState } from "react";
import Button from "../../Button/Button";

const InsertHelalth = () => {
    return(
        
        <div className="health-save-button">
            <Button color="#9CC094" text="저장" link="/inbody/update" size="20px" />
            <Button color="#9CC094" text="분석" link="/inbody" size="20px" />
        </div>
    );
}

export default InsertHelalth;