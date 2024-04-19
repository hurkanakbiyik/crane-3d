import { Canvas } from '@react-three/fiber'
import React from 'react'
import Crane from '@/components/molecules/Crane'
import type CraneModule from '@/modules/crane'
import { CameraControls } from '@react-three/drei'

interface CraneCanvasProps {
  data: CraneModule[]
}

export default function CraneCanvas (props: CraneCanvasProps) {
  return (
    <Canvas flat className="w-full h-full" camera={{ position: [10, 3, 3] }}>\
      <CameraControls />
      <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.1, 20]}/>
      </directionalLight>
      {props.data?.map((crane) => (
        <Crane key={crane.id} data={crane}/>
      ))}
    </Canvas>
  )
}
