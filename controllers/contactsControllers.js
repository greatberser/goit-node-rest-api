import * as contactsService from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import HttpError from '../helpers/HttpError.js'

export const getAllContacts = async (req, res, next) => {
    try{
        const result = await contactsService.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }  
};

export const getOneContact =  async(req, res, next) => {
    try{
        const {id} = req.params;
        const result = await contactsService.getContactById(id);

        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try{
        const { id } = req.params;
        const result = await contactsService.removeContact(id);

        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const createContact = async (req, res, next) => {
    try{
        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try{
        const { id } = req.params;
        const result = await contactsService.updateContacts(id, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`)
        }
        res.json(result)
    } catch (error) {
        next(error);
    }
};