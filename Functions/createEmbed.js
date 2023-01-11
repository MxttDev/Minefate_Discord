const { EmbedBuilder } = require("discord.js");

module.exports = function createEmbed(questions) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Rank Manager")
    .setDescription(questions)
    .setTimestamp();

  return embed;
};
