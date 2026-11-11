// GET /health - sunucu sağlık kontrolü
const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    student: "2211012053",
  });
};

module.exports = { getHealth };
