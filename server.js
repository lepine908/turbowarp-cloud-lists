const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const FILE = "./cloud.json";

function read() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/list/:name", (req, res) => {
  const data = read();
  res.json(data[req.params.name] || []);
});

app.post("/list/:name", (req, res) => {
  const data = read();
  const list = data[req.params.name] || [];
  list.push(req.body.value);
  data[req.params.name] = list;
  write(data);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Cloud lists server running");
});

