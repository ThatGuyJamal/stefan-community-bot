const { Command } = require("discord-akairo");
const ms = require("ms");

module.exports = class LinkCommand extends Command {
  constructor() {
    super("link", {
      aliases: ["link"],
      channel: "guild",
      category: "general",
      clientPermissions: ["SEND_MESSAGES"],
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message) {
    let url = this.client.config.server;

    let embed = this.client.util
      .embed()
      .setDescription(`The invite url for this server is: \n\n \`${url}\``);

    message.channel.send(embed);
  }
};
