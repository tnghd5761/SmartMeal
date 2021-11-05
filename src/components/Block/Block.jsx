import React from 'react'

import './Block.scss'

const Block = (props) => {
  return (
    <div className="items block-container">
      {props.children}
    </div>
  )
}

export default Block
