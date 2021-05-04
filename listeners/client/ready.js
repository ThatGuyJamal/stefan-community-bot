const { Listener } = require("discord-akairo");

module.exports = class ClientReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  async exec() {
    console.log(`${this.client.user.tag} is watching Stefan!`);
    console.log(`The prefix is < < ${this.client.config.prefix} > >`);

    await this.client.user.setActivity("Stefan's Community.", {
      type: "WATCHING",
    });
  }
};
