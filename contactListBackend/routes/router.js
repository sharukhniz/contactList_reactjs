const express = require("express");
const router = express.Router();
const controller = require("../controller/contact.controller");

router.get("/contacts", controller.findContact);
router.post("/contacts", controller.postContact);
router.put("/contacts/:id", controller.editContact);
router.delete("/contacts/:id", controller.deleteContact);

module.exports = router;
