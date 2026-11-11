const events = require("../data/events");

// GET /events - tüm etkinlikleri döndür
const getAllEvents = (req, res) => {
  res.status(200).json(events);
};

// GET /events/:id - tek etkinlik döndür; bulunamazsa 404
const getEventById = (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Etkinlik bulunamadı" });
  }
  res.status(200).json(event);
};

// POST /events - yeni etkinlik ekle; eksik alan varsa 400
const createEvent = (req, res) => {
  const { title, category, date, time, location, description, capacity } =
    req.body;

  if (!title || !category || !date || !time || !location || !description || !capacity) {
    return res.status(400).json({ error: "Eksik alan: title, category, date, time, location, description ve capacity zorunludur" });
  }

  const newEvent = {
    id: `event-${Date.now()}`,
    title,
    category,
    date,
    time,
    location,
    description,
    capacity: Number(capacity),
    ...(req.body.image && { image: req.body.image }),
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

module.exports = { getAllEvents, getEventById, createEvent };
