const Contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = Contacts.listContacts();
      return Contacts;
      break;

    case "get":
      const getContact = Contacts.getContactById(id);
      return getContact;
      break;

    case "add":
      const addContact = Contacts.addContact(name, email, phone);
      return addContact;
      break;

    case "remove":
      const removeContact = Contacts.removeContact(id);
      return removeContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options).then(console.log).catch(console.error);
