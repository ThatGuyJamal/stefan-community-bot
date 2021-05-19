const figlet = require("figlet");
const { Command } = require("@taminaru/dogecord");

module.exports = class AsciiCommand extends Command {
  constructor() {
    super("ascii", {
      aliases: ["ascii"],
      channel: "guild",
      category: "fun",
      cooldown: 6000,
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      userPermissions: ["SEND_MESSAGES"],
      args: [
        {
          id: "query",
          type: "string",
          match: "rest",
          prompt: {
            start: "What would you like to ascii?",
            retry: "Thats not a valid search!",
            optional: false,
          },
        },
      ],
    });
  }

  async exec(message, args) {
    let query = args.query;

    if (query.startsWith("https://"))
      return message.reply("i dont ascii links!");

    //Use the string to convert it to ascii, if there is an error, cancel, if the text is too large, cancel, if not, send
    figlet.text(query, function (err, data) {
      if (err) return message.channel.send("Something went wrong");
      console.log(err);

      if (data.length > 2000)
        return message.channel.send(
          "Too much text to output, for the love of god, don't type an entire essay."
        );

      //Ascii must be used with a monospaced font
      message.channel.send(`\`\`\`\n${data}\n\`\`\``);
    });
  }
};
