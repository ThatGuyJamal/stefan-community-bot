const { Command } = require("@taminaru/dogecord");
const ms = require("ms");

module.exports = class LinkCommand extends Command {
  constructor() {
    super("link", {
      aliases: ["link"],
      channel: "guild",
      category: "general",
      clientPermissions: ["SEND_MESSAGES"],
      userPermissions: ["SEND_MESSAGES"],
      cooldown: 6000,
    });
  }

  async exec(message) {
    let url = this.client.config.server;
    message.channel.send(url);
  }
};
