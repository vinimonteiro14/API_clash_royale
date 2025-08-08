const playerService = require("../services/playerService.js");

exports.getBattlelog = async (req, res) => {
  const { playerTag } = req.params;

  const cleanedPlayerTag = playerTag.startsWith("#")
    ? playerTag.substring(1)
    : playerTag;

  try {
    const battlelog = await playerService.fetchAndSaveBattlelog(
      cleanedPlayerTag
    );
    res.status(200).json(battlelog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  const { playerTag } = req.params;
  const cleanedPlayerTag = playerTag.startsWith("#")
    ? playerTag.substring(1)
    : playerTag;

  try {
    const stats = await playerService.getPlayerStats(cleanedPlayerTag);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
