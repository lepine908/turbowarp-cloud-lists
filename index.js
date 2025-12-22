const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const FILE = "./cloud.json";

function readData() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Lire une liste
app.get("/list/:name", (req, res) => {
  const data = readData();
  res.json(data[req.params.name] || []);
});

// Ajouter à une liste
app.post("/list/:name", (req, res) => {
  const data = readData();
  const list = data[req.params.name] || [];
  list.push(req.body.value);
  data[req.params.name] = list;
  writeData(data);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
