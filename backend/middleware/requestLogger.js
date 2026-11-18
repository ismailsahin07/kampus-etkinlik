// Her isteği terminale yazar: saat, method, adres, durum kodu, süre ve JSON gövdesi.
// Örnek: [09:41:07] POST /events 201 38ms {"title":"Girişimcilik Zirvesi",...}
// express.json()'dan önce eklenir; böylece bozuk JSON (400) istekleri de görünür.

const MAX_BODY_LENGTH = 500; // uzun gövdeler terminali doldurmasın
const SECRET_KEY = /pass|şifre|sifre|token|secret/i;

// Şifre gibi alanlar terminale düz metin yazılmasın diye gizlenir.
function hideSecrets(value) {
  if (Array.isArray(value)) return value.map(hideSecrets);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, v]) => [key, SECRET_KEY.test(key) ? "***" : hideSecrets(v)]),
    );
  }
  return value;
}

function formatBody(body) {
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) return "";
  const text = JSON.stringify(hideSecrets(body));
  return text.length > MAX_BODY_LENGTH ? `${text.slice(0, MAX_BODY_LENGTH)}…` : text;
}

function requestLogger(req, res, next) {
  const start = Date.now();

  // Yanıt gönderildikten sonra yazılır: durum kodu ve ayrıştırılmış gövde o zaman belli.
  res.on("finish", () => {
    const time = new Date().toLocaleTimeString("tr-TR");
    const line = `[${time}] ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`;
    const body = formatBody(req.body);
    console.log(body ? `${line} ${body}` : line);
  });

  next();
}

module.exports = requestLogger;
