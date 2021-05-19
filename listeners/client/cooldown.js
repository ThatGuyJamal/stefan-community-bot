const { Listener } = require('@taminaru/dogecord');
const ms = require('pretty-ms');

class CooldownListener extends Listener {
	constructor() {
		super('cooldown', {
			event: 'cooldown',
			emitter: 'commandHandler',
			category: 'commandHandler',
		});
	}

	exec(message, command, remaining) {
		const arr = [
			'Woah there! slow it',
			'stop, wait, do it again',
			'i appreciate it, buuuut you have to wait',
			'bUy pRemIuM t0 rEmOve cO0lDownS',
			'nah nah too fast',
			'mhm can ya slow it down',
			'SLOW IT MAN',
		];

		var embed = this.client.util
			.embed()
			.setTimestamp()
			.setDescription(
				`${command} doesn't want to be run right now. Wait ${ms(
					remaining
				)} to use the command again`
			)
			.setTitle(`${arr[Math.round(Math.random() * arr.length)]}`)
			.setColor(this.client.embed.ERROR);

		message.reply(embed);
	}
}

module.exports = CooldownListener;
