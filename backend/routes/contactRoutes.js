import {Router} from 'express'
import { add_controller, deleteContact, fetchContacts, updateContact } from '../controllers/contactRouteController.js'
const route = Router()

route.post("/", add_controller)
route.get("/", fetchContacts)
route.delete("/:id", deleteContact)
route.patch("/:id", updateContact)

export default route