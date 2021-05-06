const { Listener } = require("discord-akairo");

module.exports = class ClientReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  async exec() {
    console.log(`${this.client.user.tag} is watching the community!`);

    await this.client.user.setActivity("Stefan's Community", {
      type: "WATCHING",
    });
  }
};
