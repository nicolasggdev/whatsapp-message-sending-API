const express = require("express");

const router = express.Router();

const {
  sendMessage,
  closeSession,
} = require("../controllers/whastapp.controllers");

router.post("/sendMessage", sendMessage);

router.get("/closeSession", closeSession);

module.exports = { whatsappRouter: router };
