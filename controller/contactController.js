const getError = require("../middleware/errorhandle");
const Contact = require("../models/contactModel");
const getAllContact = (req, res, next) => {
  res.status(200).json({ messege: `Get all contacts` });
};

const createContact = async (req, res, next) => {
  // console.log("create contact:", req.body);
  // const { email, phone } = req.body;
  // if (!email || !phone) {
  //   res.status(400);
  //   throw new Error("All fileds are mandatory");
  // }

  try {
    const { name, email, phone } = req.body;
    // const contact = await Contact.create(req.body);
    if (!name) {
      return res.status(400).json(getError(400, "Name is required!"));
    }
    if (!email) {
      return res.status(400).json(getError(400, "Email is required!"));
    }
    if (!phone) {
      return res.status(400).json(getError(400, "Phone is required!"));
    }
    const existingEmail = await Contact.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json(getError(400, "This email already exist. Please try again!"));
    }

    const newContact = new Contact({
      name,
      email,
      phone,
    });
    const contact = await newContact.save();
    res.status(201).json({
      status: 201,
      message: "Created successfully!",
      contact: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
  res.status(201).json({ message: "Contact created successfully!" });
};

const getContactById = (req, res) => {
  res.status(200).json({ message: `Get user for ${req.params.id}` });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update user for ${req.params.id}` });
};

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete User for ${req.params.id}` });
};

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
