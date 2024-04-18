'use client';

import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { Canvas, ThreeElements } from '@react-three/fiber'

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


// Crane Component
function Crane(props: any) {
  const groupRef = useRef<THREE.Group>(null!)
  return (
    <group {...props} ref={groupRef}>
      <Arm position={[0, 0, 0]} />
    </group>
  )
}

// Arm Component
function Arm(props: any) {
  const groupRef = useRef<THREE.Group>(null!)
  return (
    <group {...props} ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1, 3.2]} />
        <meshStandardMaterial color='orange' />
      </mesh>
      <Gripper position={[0, -1, 0]} />
    </group>
  )
}

// Gripper Component
function Gripper(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  )
}

export default function Home() {

  return (
    <main className="min-h-screen p-24 h-screen">
      <Canvas className="w-full h-full">
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Crane position={[0, 0, 0]} />
      </Canvas>
    </main>
  );
}
