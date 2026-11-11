const { Router } = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
} = require("../controllers/eventsController");

const router = Router();

// GET /events         → tüm etkinlikler
// GET /events/:id     → tek etkinlik; bulunamazsa 404
// POST /events        → yeni etkinlik; eksik alan varsa 400
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

module.exports = router;
