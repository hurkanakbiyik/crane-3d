import React, { useRef } from 'react'
import type * as THREE from 'three'
import { type ElbowModuleProps } from '@/modules/crane'
import Wrist from '@/components/molecules/Wrist'

interface ElbowProps {
  data: ElbowModuleProps
  elbowRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  wristRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gripperJawRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gripperRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
}

export default function Elbow (props: ElbowProps) {
  const { data, wristRef, gripperRef, gripperJawRef, elbowRef } = props
  return (
    <group ref={elbowRef} position={[data.translate.x, data.translate.y, data.translate.z]} rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}>
      <mesh>
        <boxGeometry args={[data.width, data.height, data.depth]} />
        <meshStandardMaterial color={ data.color} />
        <Wrist data={data.wrist} wristRef={wristRef} gripperRef={gripperRef} gripperJawRef={gripperJawRef}/>
      </mesh>
    </group>
  )
}
