import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactPath = path.resolve("db", "contacts.json");

export async function updateContacts(contacts){
    fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return;
}


export async function listContacts() {
    const result = await fs.readFile(contactPath);
    return JSON.parse(result);
}

export async function getContactById(id) {
    const contacts = await listContacts();
    const response = contacts.find((contact) => contact.id === id);
    return response || null;
}

export async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) return null;

    const response = contacts.splice(index, 1);
    await updateContacts(contacts);
    return response;
}
  
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export async function updateContact(id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    }

    contacts[index] = {...contacts[index], ...data};
    await updateContacts(contacts);
    return contacts[index];
}

export async function updateStatus(id, { favorite }) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1){
        return null;
    }

    contacts[index].favorite = favorite;
    await updateContacts(contacts);

    return contacts[index];
}