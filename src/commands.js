const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');

dotenv.config();

const commands = [
	new SlashCommandBuilder().setName('qr').setDescription('Returns a QR code of given param'),
	new SlashCommandBuilder().setName('info').setDescription('Returns bot info'),
	new SlashCommandBuilder().setName('whoami').setDescription('Returns company summary'),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands })
	.then(r => console.log('Dries: Commands registered to bot'))
	.catch(err => console.error('Dries: Error=', err));

