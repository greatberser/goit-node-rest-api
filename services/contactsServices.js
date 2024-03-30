import Contact from "../models/Contact.js";

export const listContacts = (ownerId) => {
  return Contact.find({ owner: ownerId });
};
export async function getContactById(id, ownerId) {
  return Contact.findById({ id, owner: ownerId });
}

export async function removeContact(id) {
  return Contact.findByIdAndDelete({id, owner: ownerId});
}

export async function addContact(body) {
  return Contact.create({ body, owner: ownerId });
}
export async function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}
export async function updateStatus(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}