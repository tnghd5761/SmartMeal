import React from 'react'

import './Block.scss'

const Block = (props) => {

  let blockComponent ='';

  if (props.color) {
    blockComponent = 
      <div style={{backgroundColor: props.color}} className="items block-container">
          {props.children}
      </div>
  } else{
    blockComponent = 
      <div style={{backgroundColor: "#fafafa"}} className="items block-container">
          {props.children}
      </div>
  }


  return (
    <>
      {blockComponent}
    </>
  )
}

export default Block
