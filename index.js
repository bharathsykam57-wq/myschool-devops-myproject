
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");

fs.mkdirSync(dataDir, { recursive: true });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", (req, res) => {
  const users = fs.existsSync(usersFile)
    ? JSON.parse(fs.readFileSync(usersFile, "utf8"))
    : [];

  res.json(users);
});

app.post("/users", (req, res) => {
  const name = req.body?.name;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const users = fs.existsSync(usersFile)
    ? JSON.parse(fs.readFileSync(usersFile, "utf8"))
    : [];

  const user = {
    id: users.length + 1,
    name: name.trim()
  };

  users.push(user);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(201).json(user);
});

module.exports = app.listen(port, () => {
  console.log("Server listening on port " + port);
});
