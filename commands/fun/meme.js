const { Command } = require("@taminaru/dogecord");
const got = require("got");
module.exports = class MemeCommand extends Command {
  constructor() {
    super("meme", {
      aliases: ["meme", "memes"],
      category: "fun",
      channel: "guild",
      clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES", "MANAGE_MESSAGES"],
      userPermissions: ["SEND_MESSAGES"],
      ratelimit: 3,
      cooldown: 6000,
      typing: true,
      description: {
        content: "Get a meme from reddit!",
      },
    });
  }
  async exec(message) {
    message.delete()

    const subreddits = ["ProgrammerHumor", "programmingmemes", "programming_memes"];
    const randomSubs =
      subreddits[Math.floor(Math.random() * subreddits.length)];
    try {
      let embed = this.client.util.embed();
      got(`https://www.reddit.com/r/${randomSubs}/random/.json`).then(
        async (response) => {
          let content = JSON.parse(response.body);
          let permalink = content[0].data.children[0].data.permalink;
          let memeUrl = `https://reddit.com${permalink}`;
          let memeImage = content[0].data.children[0].data.url;
          let memeTitle = content[0].data.children[0].data.title;
          let memeUpvotes = content[0].data.children[0].data.ups;
          let memeDownvotes = content[0].data.children[0].data.downs;
          let memeNumComments = content[0].data.children[0].data.num_comments;
          embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
          embed.setImage(memeImage)
          embed.setColor("RANDOM")
          embed.setAuthor(`Requsted by ${message.author.tag}`)
          embed.setFooter(
            `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
          );
          embed.setTimestamp();
          await message.channel.send(embed);
        }
      );
    } catch (err) {
      this.client.logger.log(err, "error");
      return message.channel.send(
        `I ran into an error on execution: \n\`${err}\``
      );
    }
  }
};
