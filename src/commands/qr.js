const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkUri } = require('../helpers/uri.helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qr')
		.setDescription('Returns a qr code generated from the given param')
		.addStringOption(option => option.setName('url').setDescription('Please provide a valid url')),
	async execute(interaction) {
		const urlString = interaction.options.getString('url');
		await interaction.reply('Generating QR code...');
		if (checkUri(urlString)) {
			await interaction.followUp({ content: 'This is a valid url', ephemeral: true });
		}
		else {
			await interaction.followUp({ content: 'Woops, that was not a valid URL, make sure you have something like "https://www.google.com/"', ephemeral: true });
		}
	},
};
