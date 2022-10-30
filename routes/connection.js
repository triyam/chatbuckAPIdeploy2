const express = require("express");
const router = express.Router();

const {
  getAllConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  ignoreConnectionRequest,
} = require("../controller/connection");

//GET ALL CONNECTIONS
router.get("/:id", getAllConnections);

//SEND CONNECTION REQUEST
router.get("/send/:id", sendConnectionRequest);

//RECEIVE CONNECTION REQUEST
router.get("/accept/:id", acceptConnectionRequest);

//IGNORE CONNECTION REQUEST
router.get("/ignore/:id", ignoreConnectionRequest);

module.exports = router;
