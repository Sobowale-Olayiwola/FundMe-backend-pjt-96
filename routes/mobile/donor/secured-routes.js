const donorController = require("../../../controllers/mobile/donorController");
const express = require("express");
const router = express.Router();

router.get("/profile", donorController.getDonorById);
module.exports = router;
