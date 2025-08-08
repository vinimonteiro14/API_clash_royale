const mongoose = require("mongoose");

const battleLogSchema = new mongoose.Schema({
  playerTag: {
    type: String,
    required: true,
  },
  battle: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const BattleLog = mongoose.model("BattleLog", battleLogSchema);

module.exports = BattleLog;
