const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");
const config = require("./config");
const stefan = require("./data/stefan");
const { Intents } = require("discord.js");

class StefanCore extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: ["370637638820036608", "804532509332865084"], // ThatGuyJamal#2695 & Stefan Mischook#1967
      },
      {
        messageCacheLifetime: 180, // 3 min How long a message should stay in the cache until it is considered sweepable
        messageCacheMaxSize: 200, // Maximum number of messages to cache per channel
        messageEditHistoryMaxSize: 120, // 2 min - Maximum number of previous versions to hold for an edited message
        messageSweepInterval: 600, // 15 min - How frequently to remove messages from the cache that are older than the message cache lifetime (in seconds, 0 for never)
        disableMentions: "everyone",
        ws: {
          // Options for the WebSocket
          intents: [Intents.ALL],
        },
      }
    );
    // globals
    const commandHandler = new CommandHandler(this, {
      // Options for the command handler goes here.
      directory: "./commands/",
      prefix: config.prefix,
      commandUtil: true,
      blockBots: true,
      handleEdits: true,
      commandUtil: true,
      defaultCooldown: 6000,
      argumentDefaults: {
        prompt: {
          timeout: "Time ran out, command has been cancelled.",
          ended: "Too many retries, command has been cancelled.",
          cancel: "Command has been cancelled.",
          retries: 3,
          time: 20000,
        },
      },
    });

    const listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/",
    });

    // sets both command handler and event handler as globals (used in super contructor func)
    this.cmdHandler = commandHandler;
    this.eventHandler = listenerHandler;

    this.config = config;
    this.stefan = stefan;
  }
  async start() {
    await super.login(config.token); // login the bot with discord
    this.cmdHandler.useListenerHandler(this.listenerHandler);

    this.eventHandler.setEmitters({
      // handler for both commands and events at load time
      commandHandler: this.cmdHandler,
      listenerHandler: this.eventHandler,
    });
    // loading all 3
    this.cmdHandler.loadAll();
    this.eventHandler.loadAll();
  }
}

const client = new StefanCore();
client.start();

module.exports = StefanCore;
