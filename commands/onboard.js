const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const tempRank = require("../Functions/tempRank.js").currentRank;
const getUserFromID = require("../API/GET/getUserFromID.js");

const createEmbed = require("../Functions/createEmbed.js");

const { logChannel } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("onboard")
    .setDescription("Sends a random gif!")
    .addUserOption((option) =>
      option.setName("user").setDescription("get the User").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rank")
        .setDescription("Choose the rank!")
        .setRequired(true)
        .addChoices(
          { name: "Owner", value: "Owner" },
          { name: "Manager", value: "Manager" },
          { name: "Developer", value: "Developer" },
          { name: "Admin", value: "Admins" },
          { name: "SrMod", value: "Senior moderators" },
          { name: "Moderator", value: "Moderator" },
          { name: "JrMod", value: "Junior moderator" },
          { name: "Helper", value: "Helper" }
        )
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");

    const user = interaction.options.getUser("user");
    const rank = interaction.options.getString("rank");
    tempRank.set(user.id, rank);
    var channel = interaction.guild.channels.cache.get(logChannel);
    var userFromAPI = await getUserFromID(user.id);
    if (!userFromAPI.data.notFound) {
      return interaction.reply(
        "User already exists. The developer is to bad to delete from database. Seek Matts help"
      );
    }
    if (!channel) {
      return interaction.reply(
        "No channel found! Please use the staff discord!"
      );
    }
    var embed = createEmbed(
      `${interaction.member} Assigning role **${rank}** to user: ${user}!`
    );

    if (user) {
      console.log("User has ran SETRANK");

      await channel.send({ embeds: [embed] });
      await interaction.reply({ embeds: [embed] });
      user
        .send({
          content: "",
          tts: false,
          components: [
            {
              type: 1,
              components: [
                {
                  style: 3,
                  label: `Begin`,
                  custom_id: `Begin`,
                  disabled: false,
                  type: 2,
                },
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
              description: `:wave: **Hello, welcome to the MineFate staff team.**\n> To get you started we need to ask you a few questions. These questions will ask your for basic information like your IGN and email.\n> These are then used to assign you ranks across our network.\n\n:question: **What we use this information for**\n> We use the information gathered to automate the staff management systems.\n> We will grant your ranks on both of the Discord's, in-game (Minecraft) along with our Docs and Website.\n\n:warning: **Disclaimers**\n> If you do not currently have an account on the Docs or Website please create one before continuing. Failing to do so will mean you will not receive your ranks correctly.\n> If your email is different on the Docs and Website one of them will fail. Please correct to have the same email on both.\n> Your information is not shared with anyone. We keep this within the Management team and it is purely used to automate staff management.\n\n:link: **Helpful Links**\n> Website: https://www.minefate.net\n> Docs: https://docs.minefate.net\n\nYours sincerely,\nMineFate Management.`,
              color: 0xe70338,
            },
          ],
        })
        .catch(() => interaction.editReply("User dms have been turned off."));
    } else {
      await interaction.reply(`Invalid user!`);
    }

    //getAPI('http://localhost:3000/users/'+user)
  },
};
