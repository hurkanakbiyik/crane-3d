import React from 'react'
import type * as THREE from 'three'
import { type GripperModuleProps } from '@/modules/crane'

interface GripperProps {
  data: GripperModuleProps
  gripperRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gripperJawRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
}

export default function Gripper (props: GripperProps) {
  const { data, gripperRef, gripperJawRef } = props
  const jawData = data.gripperJaw
  return (
    <group ref={gripperRef} position={[data.translate.x, data.translate.y, data.translate.z]} rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}>
      <mesh>
        <boxGeometry args={[data.width, data.height, data.depth]}/>
        <meshStandardMaterial color={data.color}/>
        <group ref={gripperJawRef} position={[jawData.translate.x, jawData.translate.y, jawData.translate.z]}
               rotation={[jawData.rotation.x, jawData.rotation.y, jawData.rotation.z]}>
          <mesh>
            <boxGeometry args={[jawData.width, jawData.height, jawData.depth]}/>
            <meshStandardMaterial color={jawData.color}/>
          </mesh>
        </group>
      </mesh>
    </group>
  )
}
