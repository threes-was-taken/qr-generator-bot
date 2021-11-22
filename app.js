const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	switch (commandName) {
	case 'qr':
		await interaction.reply('QR code generating....');
		break;
	case 'whomai':
		await interaction.reply('I\'m Unikoo\'s personal QR Code Generator!');
		break;
	case 'info':
		await interaction.reply(`I was made by Dries Verelst and my purpose is generating QR codes. 
		The server I'm on: ${interaction.guild.name} with a total of ${interaction.guild.memberCount} members.`);
		break;
	default:
		await interaction.reply(`Sorry to stop the show.. ${commandName} is something I don't know`);
		break;
	}
});
client.login(process.env.DISCORD_BOT_TOKEN).then(r => console.log('Dries: The bot is up and running'));

