const { Router } = require("express");
const { getAllEvents, getEventById, createEvent } = require("../controllers/eventsController");

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

module.exports = router;
