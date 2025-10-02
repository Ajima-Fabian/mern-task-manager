import {Router} from 'express'
import { add_controller, fetchContacts } from '../controllers/contactRouteController.js'
const route = Router()

route.post("/", add_controller)
route.get("/", fetchContacts)

export default route