const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('info').setDescription('Returns info on bot'),
	async execute(interaction) {
		interaction.reply('This bot is made by Dries Verelst and it\'s purpose is to create QR codes');
	},
};
