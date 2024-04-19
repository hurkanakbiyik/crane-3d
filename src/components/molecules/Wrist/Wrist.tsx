import React from 'react'
import type * as THREE from 'three'
import { type WristModuleProps } from '@/modules/crane'
import Gripper from '@/components/molecules/Gripper/Gripper'

interface WristProps {
  data: WristModuleProps
  wristRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gripperRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gripperJawRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
}

export default function Wrist (props: WristProps) {
  const { data, wristRef, gripperRef, gripperJawRef } = props
  return (
    <group ref={wristRef} position={[data.translate.x, data.translate.y, data.translate.z]} rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}>
      <mesh>
        <boxGeometry args={[data.width, data.height, data.depth]} />
        <meshStandardMaterial color={ data.color} />
        <Gripper data={data.gripper} gripperRef={gripperRef} gripperJawRef={gripperJawRef}/>
      </mesh>
    </group>
  )
}
