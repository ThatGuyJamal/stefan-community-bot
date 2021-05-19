const { evaluate } = require('mathjs');
const { Command } = require('@taminaru/dogecord');
module.exports = class MathCommand extends Command {
	constructor() {
		super('math', {
			aliases: ['math', 'equation'],
			category: 'fun',
			channel: 'guild',
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			userPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			cooldown: 5000,
			args: [
				{
					id: 'query',
					prompt: {
						start: 'Enter a math equation\n Example: `5 + 5`',
						retry: 'Thats not a valid! Try again!',
					},
					optional: false,
					type: 'string',
					match: 'rest',
				},
			],
			description: {
				content: 'Solving simple math problems',
				usage: '[equation]',
				examples: ['10 - 5'],
			},
		});
	}
	async exec(message, { query }) {
		try {
			const result = evaluate(query);
			const embed = this.client.util
				.embed()
				.addFields(
					{ name: 'Input equation', value: `\`\`\`xl\n${query}\`\`\`` },
					{ name: 'Output result', value: `\`\`\`xl\n${result}\`\`\`` }
				)
				.setColor("RANDOM");
			message.channel.send(embed);
		} catch (err) {
			console.log(err);
			message.channel.send('**Please enter a valid equation:**');
		}
	}
};