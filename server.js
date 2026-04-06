const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS campaigns (
id TEXT PRIMARY KEY,
name TEXT,
status TEXT,
created_at TEXT
);

CREATE TABLE IF NOT EXISTS numbers (
id TEXT PRIMARY KEY,
number TEXT,
name TEXT,
status TEXT
);

CREATE TABLE IF NOT EXISTS leads (
id TEXT PRIMARY KEY,
name TEXT,
phone TEXT,
blocked INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
id TEXT PRIMARY KEY,
campaign_id TEXT,
number_id TEXT,
lead_id TEXT,
status TEXT,
created_at TEXT
);
`);

app.get("/", (req, res) => {
res.send("Head Messenger API running");
});

/* campanhas */

app.post("/campaigns", (req, res) => {
const id = uuid();

db.prepare(`
INSERT INTO campaigns (id,name,status,created_at)
VALUES (?,?,?,?)
`).run(
id,
req.body.name,
"draft",
new Date().toISOString()
);

res.send({ id });
});

app.get("/campaigns", (req, res) => {
const data = db.prepare(`
SELECT * FROM campaigns
ORDER BY created_at DESC
`).all();

res.send(data);
});

/* numeros */

app.post("/numbers", (req, res) => {
const id = uuid();

db.prepare(`
INSERT INTO numbers (id,number,name,status)
VALUES (?,?,?,?)
`).run(
id,
req.body.number,
req.body.name,
"offline"
);

res.send({ id });
});

app.get("/numbers", (req, res) => {
const data = db.prepare(`SELECT * FROM numbers`).all();
res.send(data);
});

/* leads */

app.post("/leads", (req, res) => {
const id = uuid();

db.prepare(`
INSERT INTO leads (id,name,phone)
VALUES (?,?,?)
`).run(
id,
req.body.name,
req.body.phone
);

res.send({ id });
});

app.get("/leads", (req, res) => {
const data = db.prepare(`SELECT * FROM leads`).all();
res.send(data);
});

app.listen(3000, () => {
console.log("Server running");
});
