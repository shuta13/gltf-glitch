import React from 'react'

import './Canvas.scss'

const fragment = require('../shaders/Canvas/frag.glsl')
console.log(fragment.default)

const Canvas: React.FC = () => {
  return (
    <div className="CanvasWrap">
      this is canvas
    </div>
  )
}

export default Canvas