const { error } = require("node:console");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const newContacts = contacts.filter((c) => c.id !== contactId);

  await writeContacts(newContacts);

  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await writeContacts(contacts);
  return newContact;
}

removeContact("b614e21a-a8eb-4c73-a289-f8b635dd8cf6");

listContacts().catch((error) => console.error(error));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
