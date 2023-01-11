const { Events, User } = require("discord.js");

const userQuestions = require("../Functions/userResponses.js").userQuestions;
const userResponse = require("../Functions/SetResponses.js").response;

const { question1, question2, question3, final } = require("../questions.json");
const createEmbed = require("../Functions/createEmbed.js");
const createUser = require("../API/POST/createUser.js");

const tempRank = require("../Functions/tempRank.js").currentRank;

function userCreate(UserDetails, clientID) {
  var tempy = tempRank.get(clientID);
  console.log(tempy);
  var URL = "http://localhost:3000/users/create";
  var IGN = UserDetails[0];
  var UUID = UserDetails[1];
  var DISCORDID = clientID;
  var EMAIL = UserDetails[2];
  var RANK = tempy;
  var OLDRANKS = "nil";

  createUser(URL, IGN, UUID, DISCORDID, EMAIL, RANK, OLDRANKS);
}

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.guild == null) {
      const question = userQuestions.get(message.author.id);

      if (question >= 3) {
        var users = userResponse.get(message.author.id);
        var Json = JSON.stringify(users);

        userCreate(users, message.author.id);

        message.channel.send({
          content: "",
          tts: false,
          components: [
            {
              type: 1,
              components: [
                {
                  style: 4,
                  label: `Start over`,
                  custom_id: `StartOver`,
                  disabled: false,
                  type: 2,
                },
              ],
            },
          ],
          embeds: [
            {
              type: "rich",
              title: `Rank Assigner`,
              description: `Thank you for using our discord bot to verify yourself.\n\nFor everything to come through, please allow up to 5 minutes for your whitelist and ranks to be applied. If you still have not received your rank please message one of our seniors.\n`,
              color: 0xe70338,
              footer: {
                text: `Please tell us what you think of it, and how it can be improved!`,
              },
            },
          ],
        });
        return;
      }

      switch (question) {
        case 0: // Username
          userResponse.set(message.author.id, [message.content]);
          userQuestions.set(message.author.id, 1);
          let embed2 = createEmbed(question2);
          message.channel.send({ embeds: [embed2] });
          break;
        case 1: // UUID
          var oldResponse = userResponse.get(message.author.id);

          userResponse.set(
            message.author.id,
            oldResponse.concat(message.content)
          );
          userQuestions.set(message.author.id, 2);
          console.log(oldResponse);
          let embed3 = createEmbed(question3);
          message.channel.send({ embeds: [embed3] });
          break;
        case 2: // Email
          var oldResponse = userResponse.get(message.author.id);
          userResponse.set(
            message.author.id,
            oldResponse.concat(message.content)
          );
          let embed4 = createEmbed(final);
          message.channel.send({ embeds: [embed4] });
          userQuestions.set(message.author.id, 3);
          break;
      }
    }
  },
};
