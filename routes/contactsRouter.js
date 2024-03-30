import express from "express";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import authtenticate from "../middlewars/authtenticate.js";
import { createContactSchema, updateStatusSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authtenticate)

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema),  createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema),  updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateStatusSchema), updateContact)

export default contactsRouter;