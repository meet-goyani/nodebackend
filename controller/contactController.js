const getError = require("../middleware/errorhandle");
const Contact = require("../models/contactModel");

// Get all contacts API
const getAllContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res
      .status(200)
      .json({ status: 200, messege: `Get all contacts`, contacts });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Opps sorry.. couldn't find the record!",
      contacts: [],
    });
  }
};

// Create contact API
const createContact = async (req, res, next) => {
  // console.log("create contact:", req.body);
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json(getError(400, "All fileds required!"));
    } else if (!name) {
      return res.status(400).json(getError(400, "Name is required!"));
    } else if (!email) {
      return res.status(400).json(getError(400, "Email is required!"));
    } else if (!phone) {
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
      message: "Conact has been created successfully!",
      contact: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Get contact by id API
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const getContact = await Contact.findById(id);
    if (!getContact) {
      res.status(404).json({ status: 404, message: "Cannot find contact ID" });
    }
    res.status(200).json({
      status: 200,
      message: `Get contact successfull!`,
      contact: getContact,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Opps sorry.. couldn't find the record!",
      contacts: [],
    });
  }
};

// Update contact API
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const updateCon = await Contact.findByIdAndUpdate(id, req.body);
    if (!updateCon) {
      res.status(400).json({ status: 400, message: "Connot find the ID" });
    }
    // const existingEmail = await Contact.findOne({ email });
    // if (existingEmail) {
    //   return res
    //     .status(404)
    //     .json(getError(404, "This email already exist. Please try again!"));
    // }
    const updatedContact = await Contact.findById(id);
    res.status(200).json({
      status: 200,
      message: "Contact has been updated successfully!",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Opps Sorry.. Couldn't update this record!",
    });
  }
};

// Delete Contact API
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCon = await Contact.findByIdAndDelete(id);
    if (!deleteCon) {
      return res
        .status(404)
        .json({ status: 404, message: "Cannot find contact ID" });
    }
    res.status(200).json({
      status: 200,
      message: "Contact has been deleted successfully!",
      contact: deleteCon,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Opps Sorry.. Couldn't delete this record!",
      contacts: [],
    });
  }
};

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
