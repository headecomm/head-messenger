const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const db = {
  campaigns: [],
  numbers: [],
  leads: [],
  messages: []
};

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Head Messenger</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background: #f7f7fb;
            color: #222;
          }
          .box {
            max-width: 700px;
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          h1 {
            margin-top: 0;
            color: #5b3df5;
          }
          code {
            background: #f1f1f7;
            padding: 2px 6px;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Head Messenger</h1>
          <p>Sistema publicado com sucesso na Hostinger.</p>
          <p>Esta é a primeira base do projeto.</p>
          <p>Endpoints iniciais:</p>
          <ul>
            <li><code>GET /campaigns</code></li>
            <li><code>POST /campaigns</code></li>
            <li><code>GET /numbers</code></li>
            <li><code>POST /numbers</code></li>
            <li><code>GET /leads</code></li>
            <li><code>POST /leads</code></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

/* campanhas */
app.post("/campaigns", (req, res) => {
  const item = {
    id: uuid(),
    name: req.body.name || "Nova campanha",
    status: "draft",
    created_at: new Date().toISOString()
  };

  db.campaigns.push(item);
  res.json(item);
});

app.get("/campaigns", (req, res) => {
  res.json(db.campaigns);
});

/* números */
app.post("/numbers", (req, res) => {
  const item = {
    id: uuid(),
    number: req.body.number || "",
    name: req.body.name || "Novo número",
    status: "offline"
  };

  db.numbers.push(item);
  res.json(item);
});

app.get("/numbers", (req, res) => {
  res.json(db.numbers);
});

/* leads */
app.post("/leads", (req, res) => {
  const item = {
    id: uuid(),
    name: req.body.name || "Novo lead",
    phone: req.body.phone || "",
    blocked: false
  };

  db.leads.push(item);
  res.json(item);
});

app.get("/leads", (req, res) => {
  res.json(db.leads);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Head Messenger rodando na porta ${PORT}`);
});
