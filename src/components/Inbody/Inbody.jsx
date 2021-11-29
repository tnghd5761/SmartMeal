import React, { useState } from "react";
import Button from "../../Button/Button";

import './Inbody.scss'

const Inbody = () => {
    return(
        
        <div className="health-update-button">
            <Button color="#9CC094" text="수정" link="/inbody/update" size="20px" />
        </div>
    );
}

export default Inbody
