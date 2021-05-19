const { Command } = require("@taminaru/dogecord");

module.exports = class InviteCommand extends Command {
  constructor() {
    super("invite", {
      aliases: ["invite"],
      category: "owner",
      channel: ["guild", "dm"],
      ownerOnly: true,
    });
  }

  async exec(message) {
    let embed = this.client.util
      .embed()
      .setTitle("Invite URl")
      .setDescription(`[Click me](${this.client.config.authURL})`);

    await message.author.send(embed).catch(() => {
      return message
        .reply(`Your dms are locked!`)
        .then(
          message.channel.send(embed).then((m) => m.delete({ timeout: 10000 }))
        );
    });
    message.channel.send("📪 You have mail!");
  }
};
