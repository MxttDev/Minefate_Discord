const getSpecificUserID = require("../Endpoints.json");
const axios = require("axios");

module.exports = function getUserFromID(ClientID) {
  return axios.get(getSpecificUserID.getSpecificUserID + ClientID);
};
