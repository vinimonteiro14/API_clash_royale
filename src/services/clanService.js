const clashRoyaleApi = require("./baseService.js");

exports.getClanInfo = async (clanTag) => {
  try {
    const response = await clashRoyaleApi.get(`/clans/%23${clanTag}`);
    return response.data;
  } catch (error) {
    if (error.message) {
      throw new Error(
        `Error on Clash Royale API: ${error.response.status} - ${error.response.data.reason}`
      );
    } else if (error.request) {
      throw new Error("Not possible to connect with Clash Royale API");
    } else {
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
