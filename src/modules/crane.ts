export interface TranslateProps {
  x: number
  y: number
  z: number
}

interface BaseModuleProps {
  translate: TranslateProps
  rotation: TranslateProps
  width: number
  height: number
  depth: number
  color: string
  speed: number
}

export interface GripperModuleProps extends BaseModuleProps {
  gripperJaw: BaseModuleProps
}

export interface WristModuleProps extends BaseModuleProps {
  gripper: GripperModuleProps
}

export interface ElbowModuleProps extends BaseModuleProps {
  wrist: WristModuleProps
}

export interface SwingModuleProps extends BaseModuleProps {
  elbow: ElbowModuleProps
}

export interface CraneModuleProps {
  id: number
  swing: SwingModuleProps
}

export default class CraneModule implements CraneModuleProps {
  constructor (props: CraneModuleProps) {
    this.id = props.id
    this.swing = props.swing
  }

  id: number
  swing: SwingModuleProps
}
