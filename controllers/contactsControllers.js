import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
      const ownerId = req.user._id;
  
      const result = await contactsService.listContacts(ownerId);
  
      res.json(result);
    } catch (error) {
      next(error);
    }
};
  

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ownerId = req.user._id;
    const result = await contactsService.getContactById(id, ownerId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
    try {
      const ownerId = req.user._id;
      const { error } = createContactSchema.validate(req.body);
      if (error) throw HttpError(400, error.message);
  
      const result = await contactsService.addContact(ownerId, req.body);
  
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
};
  
export const deleteContact = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const { id } = req.params;

        const result = await contactsService.removeContact(id, ownerId);
        if (!result) {
        throw HttpError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = updateContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.updateStatus(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};