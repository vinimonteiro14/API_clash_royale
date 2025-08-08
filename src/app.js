require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const playerRoutes = require("./routes/player.js");
const clanRoutes = require("./routes/clan.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/clans", clanRoutes);

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error to connect to MongoDB:", err.message));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Serveris running on http://localhost:${PORT}`);
});
