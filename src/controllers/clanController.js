const clanService = require("../services/clanService.js");

exports.getClanInfo = async (req, res) => {
  const { clanTag } = req.params;
  const cleanedClanTag = clanTag.startsWith("#")
    ? clanTag.substring(1)
    : clanTag;

  try {
    const clanInfo = await clanService.getClanInfo(cleanedClanTag);
    res.status(200).json(clanInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
