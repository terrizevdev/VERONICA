// handlers/commandHandler.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = new Map();

export async function loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);
        commands.set(command.name, command);
    }
}

export function getCommand(name) {
    return commands.get(name);
}

export function getAllCommands() {
    return Array.from(commands.values());
}

export function isCommand(text) {
    return text.startsWith(config.prefix);
}

export function parseCommand(text) {
    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    return { commandName, args };
}