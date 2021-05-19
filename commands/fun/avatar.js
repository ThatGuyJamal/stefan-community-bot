const { Command } = require("@taminaru/dogecord");
module.exports = class Avatar extends Command {
  constructor() {
    super("avatar", {
      aliases: ["avatar", "av", "pfp"],
      channel: "guild",
      category: "fun",
      cooldown: 6000,
      args: [
        {
          id: "member",
          type: "member",
          default: (message) => message.member,
        },
      ],
    });
  }

  async exec(message, args) {
    let msg = await message.channel.send("Generating avatar...");

    const member = args.member;

    const embed = this.client.util
      .embed()
      .setImage(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setColor("RANDOM")
      .setTitle(`**Avatar of ${member.user.tag} **`)
      .setDescription(
        "[**Avatar URL link**](" +
          member.user.displayAvatarURL({ dynamic: true }) +
          ")"
      )
      .setTimestamp();

    message.channel.send(embed);

    msg.delete();
  }
};
