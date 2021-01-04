const shaderMaterial = {
    uniforms: {
      time: { type: 'f', value: 0 }
    },
    transparent: true,
    depthWrite: false,
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 newPosition = position + vec3( sin((time + uv.x + uv.y) * 10.0) * 0.2,cos((time + uv.x + uv.y) * 10.0) *0.2,0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
      }
    `,
    fragmentShader: `
    precision highp float;
    varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(vUv.x, vUv.y, 0, 1.0);
      }
    `
  }
  
  export default shaderMaterial
  