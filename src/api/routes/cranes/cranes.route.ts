import express from 'express'

import CraneModule from '../../../modules/crane'

import { faker } from '@faker-js/faker'
const router = express()

function animateCrane (currentCrane: CraneModule) {
  currentCrane.swing.rotation.y = faker.number.float({ max: 2, min: -2 })
  currentCrane.swing.elbow.translate.y = faker.number.float({ max: 2, min: -2 })
  currentCrane.swing.elbow.wrist.rotation.y = faker.number.float({ max: 2, min: -2 })
  currentCrane.swing.elbow.wrist.gripper.gripperJaw.translate.x = faker.number.float({ max: 0.5, min: -0.5 })

  currentCrane.swing.speed = faker.number.int({ max: 3000, min: 500 })
  currentCrane.swing.elbow.speed = faker.number.int({ max: 3000, min: 500 })
  currentCrane.swing.elbow.wrist.speed = faker.number.int({ max: 3000, min: 500 })
  currentCrane.swing.elbow.wrist.gripper.gripperJaw.speed = faker.number.int({ max: 3000, min: 500 })
  return currentCrane
}

function createNewCrate () {
  const swingWidth = faker.number.float({ max: 1, min: 0.1 })
  const swingHeight = faker.number.float({ max: 10, min: 5 })
  const elbowWidth = faker.number.float({ max: 10, min: 4 })
  const wristWidth = faker.number.float({ max: 5, min: 2 })
  const elbowHeight = faker.number.float({ max: 0.3, min: 0.1 })
  const gripperHeight = faker.number.float({ max: 3, min: 1 })
  return new CraneModule(
    // fill with sample data
    {
      id: 1,
      swing: {
        speed: faker.number.int({ max: 3000, min: 500 }),
        translate: {
          x: 0,
          y: 0,
          z: 0
        },
        rotation: {
          x: 0,
          y: faker.number.float({ max: 1, min: 0 }),
          z: 0
        },
        width: swingWidth,
        height: swingHeight,
        color: faker.color.rgb(),
        depth: 1,
        elbow: {
          speed: faker.number.int({ max: 3000, min: 500 }),
          translate: {
            x: elbowWidth / 2,
            y: faker.number.int({ max: swingHeight - 4, min: 0.1 }),
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0
          },
          width: elbowWidth,
          height: elbowHeight,
          color: 'blue',
          depth: faker.number.float({ max: 0.5, min: 0.1 }),
          wrist: {
            speed: faker.number.int({ max: 3000, min: 500 }),
            translate: {
              x: elbowWidth / 2,
              y: -elbowHeight,
              z: 0
            },
            rotation: {
              x: 0,
              y: 0,
              z: 0
            },
            width: wristWidth,
            height: faker.number.float({ max: 0.3, min: 0.1 }),
            depth: faker.number.float({ max: 0.4, min: 0.1 }),
            color: 'green',
            gripper: {
              translate: {
                x: wristWidth / 2,
                y: -gripperHeight / 2,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 0
              },
              width: faker.number.float({ max: 0.3, min: 0.1 }),
              height: gripperHeight,
              depth: 1,
              color: faker.color.rgb(),
              speed: faker.number.int({ max: 1000, min: 100 }),
              gripperJaw: {
                translate: {
                  x: 0,
                  y: -gripperHeight / 2,
                  z: 0
                },
                rotation: {
                  x: 0,
                  y: 0,
                  z: 0
                },
                width: faker.number.float({ max: 1, min: 0.2 }),
                height: faker.number.float({ max: 0.3, min: 0.1 }),
                depth: 1,
                color: faker.color.rgb(),
                speed: faker.number.int({ max: 1000, min: 100 })
              }
            }
          }
        }
      }
    }
  )
}

router.use(express.json())

router
  .route('')
  .get((req: express.Request, res: express.Response) => {
    return res.json({
      cranes: [createNewCrate()]
    })
  })

router
  .route('')
  .patch((req: express.Request, res: express.Response) => {
    const updatedCrane = req.body as CraneModule
    const emitTitle = `crane-room-${updatedCrane.id}`
    router.get('socketio').emit(emitTitle, JSON.stringify(animateCrane(updatedCrane)))

    return res.sendStatus(201)
  })

export default router
