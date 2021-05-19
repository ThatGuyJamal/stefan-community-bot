const { Command } = require("@taminaru/dogecord");
module.exports = class NodeCommand extends Command {
  constructor() {
    super("node", {
      aliases: ["node"],
      category: "resources",
      channel: "guild",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      userPermissions: ["SEND_MESSAGES"],
      cooldown: 15000,
      // args: [
      // 	{
      // 		id: 'query',
      // 		prompt: {
      // 			start: 'Enter a math equation\n Example: `5 + 5`',
      // 			retry: 'Thats not a valid! Try again!',
      // 		},
      // 		optional: false,
      // 		type: 'string',
      // 		match: 'rest',
      // 	},
      // ],
      description: {
        content: "Solving simple math problems",
        usage: "[equation]",
        examples: ["10 - 5"],
      },
    });
  }
  async exec(message, { query }) {
    message.reply(`Useful links for learning JavaScript and Node:

        CodeCademy online course: https://www.codecademy.com/learn/javascript
        Eloquent Javascript, free book: http://eloquentjavascript.net/
        MDN's JavaScript guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
        You Don't Know JS (free book series): https://github.com/getify/You-Dont-Know-JS
        Some Node: https://nodeschool.io/ https://www.codeschool.com/courses/real-time-web-with-node-js
        Javascript reference/docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)`);
  }
};
