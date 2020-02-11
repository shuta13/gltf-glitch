import React, { useEffect } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three'

import './Canvas.scss'

// ----------
// types
type HandleResizeParams = {
  camera: PerspectiveCamera
  renderer: WebGLRenderer
}
// ----------

const Canvas: React.FC = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }
  
    // init scene
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setClearColor('#1d1d1d')
    renderer.setSize(width, height)
  
    renderer.render(scene, camera)

    // resize
    window.addEventListener('resize', () => handleResize({ camera, renderer }))
  }
  // handle resize
  const handleResize = ({ camera, renderer }: HandleResizeParams) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  useEffect(() => {
    return () => window.removeEventListener('resize', () => handleResize)
  })
  return (
    <div className="CanvasWrap">
      <canvas ref={onCanvasLoaded} />
    </div>
  )
}

export default Canvas