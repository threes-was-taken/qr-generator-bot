const fs = require('fs');
const dotenv = require('dotenv');
const { Client, Intents, Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();

for (const commandFile of commandFiles) {
	const command = require(`./src/commands/${ commandFile }`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('Dries: Loading commands into bot...');

	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

	try {
		if (process.env.ENV === 'production') {
			await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
				body: commands,
			});
			console.log('Dries: Successfully registered commands globally');
		}
		else {
			await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_SERVER_ID), {
				body: commands,
			});
			console.log('Dries: Successfully registered commands locally');
		}
	}
	catch (error) {
		if (error) console.error('Dries: ', error);
	}
	console.log('Dries:', `Connected as ${ client.user.tag }`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error('Dries: error=', error);
		await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
	}

});
client.login(process.env.DISCORD_BOT_TOKEN);

