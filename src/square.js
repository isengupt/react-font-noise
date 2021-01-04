import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

import shaderMaterial from './shader'

// const vertices = new Float32Array([-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0])
const vertices = [
  { pos: [-1.0, -1.0, 1.0], norm: [0, 0, 1], uv: [0, 1] },
  { pos: [1.0, -1.0, 1.0], norm: [0, 0, 1], uv: [1, 1] },
  { pos: [-1.0, 1.0, 1.0], norm: [0, 0, 1], uv: [0, 0] },
  { pos: [-1.0, 1.0, 1.0], norm: [0, 0, 1], uv: [0, 0] },
  { pos: [1.0, -1.0, 1.0], norm: [0, 0, 1], uv: [1, 1] },
  { pos: [1.0, 1.0, 1.0], norm: [0, 0, 1], uv: [1, 0] }
]
let positions = []
let uvs = []

for (let i = 0; i < vertices.length; i++) {
  positions.push(...vertices[i].pos)
  uvs.push(...vertices[i].uv)
}

positions = new Float32Array(positions)
uvs = new Float32Array(uvs)

function Square(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime
  })

  return (
    <mesh {...props} ref={mesh}>
      <bufferGeometry attach="geometry" args={[1, 1, 1]}>
        <bufferAttribute attachObject={['attributes', 'position']} args={[positions, 3]} />
        <bufferAttribute attachObject={['attributes', 'uv']} args={[uvs, 2]} />
        {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
      </bufferGeometry>
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
  )
}

export default Square
