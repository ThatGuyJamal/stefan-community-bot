const { Command } = require("@taminaru/dogecord");
const ms = require("ms");

module.exports = class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      channel: "guild",
      category: "general",
      clientPermissions: ["SEND_MESSAGES"],
      userPermissions: ["SEND_MESSAGES"],
      cooldown: 10000,
    });
  }

  async exec(message) {
    const m = await message.channel.send(
      this.client.util.embed().setDescription(`Fetching ping...`)
    );
    const msglate = m.createdTimestamp - message.createdTimestamp;
    const msguser = message.client.users.cache.get(message.author.id);
    let embed = this.client.util.embed();
    embed.addField(
      `${this.client.user.username} Uptime`,
      `🖥 ${this.client.user.username} has been up for \`${ms(
        this.client.uptime
      )}\``
    );
    embed.addField(
      `${this.client.user.username}'s Message Latency`,
      ` 🏓 Message latency is \`${msglate} ms\``
    );
    embed.setThumbnail(message.guild.iconURL());
    embed.addField(
      "Discord API Latency",
      `🤖 Discord API latency is \`${Math.round(this.client.ws.ping)} ms!\``
    );
    embed.setTimestamp();
    embed.setImage;
    embed.setColor("RANDOM");

    m.edit(embed);
  }
};
