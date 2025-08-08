const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.clashroyale.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.TOKEN_API_SUPERCELL}`,
  },
});

module.exports = api;
