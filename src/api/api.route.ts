import bodyParser from 'body-parser'
import express from 'express'
import cranesRoute from './routes/cranes/cranes.route'
const router = express()

router.use(bodyParser.json())
router.use('/cranes', cranesRoute)

export default router
