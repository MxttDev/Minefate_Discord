const axios = require("axios");

module.exports = function userCreate(
  URL,
  IGN,
  UUID,
  DISCORDID,
  EMAIL,
  RANK,
  OLDRANKS
) {
  axios
    .post(URL, {
      ign: IGN,
      uuid: UUID,
      discordid: DISCORDID,
      email: EMAIL,
      rank: RANK,
      oldranks: OLDRANKS,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
