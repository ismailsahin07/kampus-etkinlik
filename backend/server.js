require("dotenv").config();
const express = require("express");

const healthRouter = require("./routes/health");
const eventsRouter = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/health", healthRouter);
app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
