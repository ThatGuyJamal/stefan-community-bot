const { Command } = require("discord-akairo");
module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "commands"],
      channel: "guild",
      category: "general",

      clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
      userPermissions: ["SEND_MESSAGES"],
      args: [
        {
          id: "command",
          type: "commandAlias",
        },
      ],
    });
  }
  async exec(message, { command }) {
    let embed = this.client.util
      .embed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(
        this.client.user.username,
        this.client.user.displayAvatarURL({ dynamic: true })
      );
    for (const [name, category] of this.handler.categories.filter(
      this.filter(message)
    )) {
      embed.addField(
        `☄ ${name.replace(/(\b\w)/gi, (str) => str.toUpperCase())} [${
          category.size
        }]`,
        category
          .filter((cmd) => (cmd.aliases ? cmd.aliases.length > 0 : false))
          .map((cmd) => `\`${cmd.aliases[0]}\``)
          .join(", ") || "Bug!"
      );
      embed
        .setTitle("🎥" + " YouTube")
        .setURL(`${this.client.stefan.youtube}`)
        .setFooter(`Keep on coding!`);
    }

    return message.channel.send(
      embed.setThumbnail(this.client.user.displayAvatarURL())
    );
  }

  filter(message) {
    return (c) =>
      ![
        "flag",
        ...(!message.guild
          ? ["nsfw"]
          : message.member.hasPermission("MANAGE_GUILD", {
              checkAdmin: true,
              checkOwner: true,
            })
          ? ["flag"]
          : ["flag"]),
      ].includes(c.id);
  }
};
