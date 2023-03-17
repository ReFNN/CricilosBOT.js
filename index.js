// TOKEN BOT PRINCIPAL
// TOKEN = 'MTA1MTU2NzIyNTQ2ODg4NzIwMQ.GEd0g1.pAmZN671tssjnPYg7qUajtxRZnRYVwn39s7D08'

// TOKEN BOT TESTE
// TOKEN = 'MTA1MzEyMDI0Njg2Njc4MDE3Mg.GeTKUZ.hOXmRYaIZrDixKHtfKkwsNyvIkQXNCpcRoWMa4'

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require("./config.json");

// *! INICIANDO BOT
client
  .login(config.tokentest)
  .then(() =>
    console.log(`Bot iniciado com sucesso com ${client.user.username}.`)
  )
  .catch((err) => console.log(`Erro ao iniciar o bot: ${err.message}`));

client.on("ready", () => {
  client.user.setStatus("dnd");
  client.user.setActivity("Developed by ReFNN#0847");
});

module.exports = client;

client.on("interactionCreate", (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(
      interaction.user.id
    );
    cmd.run(client, interaction);
  }
});

client.slashCommands = new Discord.Collection();

require("./handler")(client);
