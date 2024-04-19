import React, { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import * as TWEEN from '@tweenjs/tween.js'

import io from 'socket.io-client'
import { type TranslateProps } from '@/modules/crane'
import type CraneModule from '@/modules/crane'
import Elbow from '@/components/molecules/Elbow'
const socket = io('http://localhost:3000')
interface CraneProps {
  data: CraneModule
}

function rotateMesh (ref: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>, meshMovement: TranslateProps, speed: number = 1000) {
  new TWEEN.Tween(ref.current.rotation)
    .to(
      {
        ...meshMovement
      },
      speed
    )
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}
function translateMesh (ref: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>, meshMovement: TranslateProps, speed: number = 1000) {
  new TWEEN.Tween(ref.current.position)
    .to(
      {
        ...meshMovement
      },
      speed
    )
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}

export default function Crane (props: CraneProps) {
  const { data } = props
  const { swing } = data
  const groupRef = useRef<THREE.Group>(null!)
  const elbowRef = useRef<THREE.Group>(null!)
  const wristRef = useRef<THREE.Group>(null!)
  const gripperRef = useRef<THREE.Group>(null!)
  const gripperJawRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    TWEEN.update()
  })

  useEffect(() => {
    socket.on(`crane-room-${data.id}`, (data: string) => {
      const newData = JSON.parse(data) as CraneModule
      console.log(newData)
      rotateMesh(groupRef, newData.swing.rotation, newData.swing.speed)
      translateMesh(elbowRef, newData.swing.elbow.translate, newData.swing.elbow.speed)
      rotateMesh(wristRef, newData.swing.elbow.wrist.rotation, newData.swing.elbow.wrist.speed)
      translateMesh(gripperJawRef, newData.swing.elbow.wrist.gripper.gripperJaw.translate, newData.swing.elbow.wrist.gripper.gripperJaw.speed)
    })
  }, [data.id])

  return (
    <group ref={groupRef}>
      <mesh position={[data.swing.translate.x, data.swing.translate.y, data.swing.translate.z]} rotation={[data.swing.rotation.x, data.swing.rotation.y, data.swing.rotation.z]}>
        <cylinderGeometry args={[swing.width, swing.width, swing.height]} />
        <meshStandardMaterial color={swing.color} />
        <Elbow data={data.swing.elbow} elbowRef={elbowRef} wristRef={wristRef} gripperRef={gripperRef} gripperJawRef={gripperJawRef}/>
      </mesh>
    </group>
  )
}
