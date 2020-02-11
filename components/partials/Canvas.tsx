import React, { useEffect, useRef, useCallback } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import RGBLoader from 'three/examples/jsm/loaders/RGBELoader'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper'

import './Canvas.scss'

const marcus_aurelius = require('../../public/marcus_aurelius/scene.gltf')
console.log(marcus_aurelius)

const image = require('../../public/lena_color.png')
console.log(image)

// ----------
// types
type AnimateParams = {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
}
type RendererParams = {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
}
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
    const camera = new PerspectiveCamera(120, width / height, 1.0, 1000)
    camera.position.z = 800
    camera.lookAt
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setClearColor('#1d1d1d')
    renderer.setSize(width, height)

    const loader = new GLTFLoader()
    let model;
    loader.load('/marcus_aurelius/scene.gltf', (gltf) => {
      model = gltf.scene
      model.name = 'marcus_aurelius'
      model.scale.set(200.0, 200.0, 200.0)
      model.position.set(0.0, -200.0, 0.0)
      model.rotation.y = -200
      scene.add(model)
    })
    renderer.gammaFactor = 2.2

    const light = new DirectionalLight(0xffffff)
    light.intensity = 2
    light.position.set(1, 1, 1,)
    scene.add(light)

    requestRef.current = window.requestAnimationFrame(() => animate({ scene, camera, renderer }))

    // resize
    window.addEventListener('resize', () => handleResize({ camera, renderer }))

    console.log(scene.children[0])
  }

  // animate
  const requestRef = useRef(0)
  const animate = useCallback(({ scene, camera, renderer }: AnimateParams) => {
    render({ scene, camera, renderer })
    requestRef.current = window.requestAnimationFrame(() => animate({ scene, camera, renderer }))
  }, [])
  useEffect(() => {
    return () => window.cancelAnimationFrame(requestRef.current)
  }, [animate])

  // render
  const render = ({ scene, camera, renderer }: RendererParams) => {
    // const object = scene.children[0] as any
    // const time = performance.now() / 1000

    renderer.render(scene, camera)
  }

  // handle resize
  const handleResize = ({ camera, renderer }: HandleResizeParams) => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
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