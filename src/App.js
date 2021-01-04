import React, { Suspense, useRef } from "react";
import Square from "./square";
import Noise from "./Noise";
import Text from "./Text";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./styles.css";

import NoisePlane from "./NoisePlane";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Jumbo() {
  const ref = useRef();
  const { aspect } = useThree();

  return (
    <>
      <group ref={ref}>
        <Text hAlign="center" position={[0, 0, 0.3]} children="THREE" />
        <Noise position={[0, 0, 0]} />
      </group>
    </>
  );
}

var frustumSize = 3;
//var aspect = window.innerWidth / window.innerHeight;

function App() {
  const { aspect } = useThree();
  const [mouseTarget, setMouseTarget] = React.useState({ x: 0, y: 0 });
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });


  function mouseMoved(e) {
setMouse( {x:  2 * (e.pageX / window.innerWidth  - 0.5),
 y: 2 * (e.pageY / window.innerHeight - 0.5)})
 
setMouseTarget((e) => ({ x : e.x - 0.1 * (e.x - mouse.x),
   y : e.y - 0.1 * (e.y - mouse.y)  }))


  }
  return (
    <Canvas
      orthographic
      camera={{
        left: (frustumSize * aspect) / -2,
        right: (frustumSize * aspect) / 2,
        top: frustumSize / 2,
        bottom: frustumSize / -2,
        near: -1000,
        zoom: 200,
        position: [0, 0, 2],
      }}
      onCreated={({ gl, camera }) => {
        gl.physicallyCorrectLights = true;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.setClearColor("#000");
      }}
      pixelRatio={getDevicePixelRatio()}
      onMouseMove={(e) => mouseMoved(e)}
    >
      <CameraControls />

      <Suspense fallback={null}>
        <NoisePlane mouseTarget={mouseTarget}/>
      </Suspense>
    </Canvas>
  );
}

const getDevicePixelRatio = (maxDpr = 2) =>
  typeof window !== "undefined"
    ? Math.min(
        Math.max(Math.round(window.devicePixelRatio), 1),
        maxDpr
      ).toFixed(1)
    : "1.0";
export default App;
