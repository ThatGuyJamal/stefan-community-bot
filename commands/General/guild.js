const { Command } = require("discord-akairo");
const ms = require("ms");

module.exports = class GuildCommand extends Command {
  constructor() {
    super("guild", {
      aliases: ["guild"],
      channel: "guild",
      category: "general",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message) {
    let members = message.guild.memberCount; // gets the total member count in the server
    const region = message.guild.region;
    const boostLevel = message.guild.premiumTier;
    const boosts = message.guild.premiumSubscriptionCount;
    const verification = message.guild.verificationLevel;
    const timestamp = message.guild.createdAt;

    const d = new Date(timestamp);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let strSeconds = d.getSeconds().toString();

    if (strSeconds.length === 1) {
      strSeconds = "0" + strSeconds;
    }

    var strTime = hours + ":" + minutes + ":" + strSeconds + " " + ampm;

    let date = strTime + ", " + d.toDateString();

    let embed = this.client.util
      .embed()
      .setTimestamp()
      .setColor("RANDOM")
      .setDescription(`General information on **${message.guild.name}**.`)
      .addField(
        "Users",
        `\`${
          members ? members : "error fetching members"
        }\` total members in the server!`
      )
      .addFields(
        {
          name: "Boost level: ",
          value: `${boostLevel}`,
        },
        {
          name: "Verification Level: ",
          value: `${verification}`,
        },
        {
          name: "Boost count: ",
          value: `${boosts}`,
        },
        {
          name: "Date created: ",
          value: `${date}`,
        },
        {
          name: "Region",
          value: `${region}`,
        }
      );

    message.channel.send(embed);
  }
};
