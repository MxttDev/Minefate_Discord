const { Events, Collection } = require("discord.js");

const createEmbed = require("../Functions/createEmbed.js");
const { question1, question2, question3 } = require("../questions.json");
const userQuestions = require("../Functions/userResponses.js").userQuestions;

async function startQuestions(user, interaction) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000); /// waiting 1 second.

  userQuestions.set(user.id, 0);
  let questionList = userQuestions.get(user.id);

  switch (questionList) {
    case 0:
      let embed1 = createEmbed(question1);
      await interaction.channel.send({ embeds: [embed1] });
      break;
    default:
      await interaction.channel.send(
        "Error, please try the button again (also message @Matt the problem)"
      );
  }
}

async function restart(user) {}

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;

    if (interaction.user.id === interaction.user.id) {
      if (interaction.customId.toLowerCase() == "begin") {
        if (!interaction.replied) {
          interaction.reply("``Generating questions..``");
          return startQuestions(interaction.user, interaction); //Start the questions
        }
      } else if (interaction.customId.toLowerCase() == "startover")
        if (!interaction.replied) {
          interaction.reply("``Generating questions..``");
          return startQuestions(interaction.user, interaction); //Start the questions
        }
    } else {
      i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    }
  },
};
