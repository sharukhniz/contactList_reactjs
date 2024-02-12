const contact = require("../model/contact.model");

  const findContacts = async ({ page = 1, limit = 10, search }) => {
  const pipeline = [];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  const countPipeline = [...pipeline, { $count: "total" }];

  pipeline.push({ $skip: (page - 1) * limit }, { $limit: parseInt(limit) });

  const contacts = await contact.aggregate(pipeline).exec();

  const totalResult = await contact.aggregate(countPipeline).exec();
  const totalCount = totalResult.length > 0 ? totalResult[0].total : 0;

  return { contacts, totalCount };
};

const createContact = async (data) => {
  try {
    return await contact.create(data);
  } catch (error) {
    console.error("Error Creating contact:", error);
    throw new Error("Internal server error creating contact");
  }
};

const editContact = async (id, newData) => {
  try {
    const editContact = await contact.findByIdAndUpdate(id, newData);
    if (!editContact) {
      throw new Error(`Cannot find any contact with ID ${id}`);
    }
    const updatedContact = await contact.findById(id);
    return updatedContact;
  } catch (error) {
    console.error("Error Editing contact:", error);
  }
};

const deleteContact = async (id) => {
  try {
    const deletedContact = await contact.findByIdAndDelete(id);
    if (!deletedContact) {
      throw new Error(`Cannot find any contact with ID ${id}`);
    }
    return deletedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Internal server error deleting contact");
  }
};

module.exports = {
  findContacts,
  createContact,
  editContact,
  deleteContact,
};
