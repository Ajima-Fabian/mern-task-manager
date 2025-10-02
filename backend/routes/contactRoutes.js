import {Router} from 'express'
import { add_controller } from '../controllers/contactRouteController.js'
const route = Router()

route.post("/", add_controller)

export default route