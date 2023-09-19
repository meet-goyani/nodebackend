const express = require("express");
const router = express.Router();
const {
  getAllContact,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.route("/getAllContact").get(getAllContact);

router.route("/createContact").post(createContact);

router.route("/getContactById/:id").get(getContactById);

router.route("/updateContact/:id").put(updateContact);

router.route("/deleteContact/:id").delete(deleteContact);

module.exports = router;
