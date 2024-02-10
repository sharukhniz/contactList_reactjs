const asyncHandler = require("express-async-handler");
const contactService = require("../services/contact.services");

exports.findContact = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  const { contacts, totalCount } = await contactService.findContacts({
    page,
    limit,
    search,
  });
  const pageCount = Math.ceil(totalCount / limit);
  res.status(200).json({ pageCount, contacts, totalCount });
});

exports.postContact = asyncHandler(async (req, res) => {
  const createdContact = await contactService.createContact(req.body);
  res.status(201).json(createdContact);
});

exports.editContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactService.editContact(id, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: `Cannot find any contact with ID ${id}` });
  }
  res.status(200).json(updatedContact);
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactService.deleteContact(id);
  if (!deletedContact) {
    return res.status(404).json({ message: `Cannot find any contact with ID ${id}` });
  }
  res.status(200).json(deletedContact);
});
