const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { generateQrCode } = require('../helpers/generate-qr.helper');
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
			generateQrCode(urlString);

			const qrCode = new MessageAttachment(path.join(__dirname, '/../images/qr_code.png'));

			const embeddedMsg = new MessageEmbed()
				.setTitle('Your QR Code')
				.setDescription(`The generated QR code based on the following URL: ${urlString}`)
				.setImage('attachment://qr_code.png');

			await interaction.followUp({ ephemeral: true, embeds: [embeddedMsg], files: [qrCode] });

			fs.unlink(path.join(__dirname, '/../images/qr_code.png'), (error) => {
				if (error) throw error;
				console.log('File successfully deleted!');
			});
		}
		else {
			await interaction.followUp({ content: 'Woops, that was not a valid URL, make sure you have something like "https://www.google.com/"', ephemeral: true });
		}
	},
};
