const { Listener } = require("@taminaru/dogecord");

module.exports = class MessageListener extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  async exec(message) {
    const prefix = this.client.config.prefix;
    if (
      message.content.match(new RegExp(`^<@!?${this.client.user.id}>( |)$`))
    ) {
      let embed = this.client.util
        .embed()
        .setTitle("Quick Help")
        .setColor("RANDOM")
        .setDescription(
          `My prefix is \`${prefix}\`. \n My job is to provide basic information and utility functions for \`${message.guild.name}!\` \n\n For more support run \`${prefix}help\``
        )
        .setThumbnail(message.guild.iconURL())
        .setTimestamp();
      message.reply(embed);
    }
    return;
  }
};
