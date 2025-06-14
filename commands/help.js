// commands/help.js
import { getAllCommands } from '../handlers/commandHandler.js';
import config from '../config.js';

export const name = 'help';
export const description = 'Show all available commands';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const commands = getAllCommands();
    const remoteJid = message.key.remoteJid;
    const isOwner = config.owners.includes(remoteJid);

    let helpText = `📚 *${config.name} Command List*\n\n` +
                   `Prefix: ${config.prefix}\n\n` +
                   '*Available Commands:*\n';

    commands.forEach(cmd => {
        // Only show owner commands to owner
        if (cmd.ownerOnly && !isOwner) return;
        
        helpText += `\n⭐ *${config.prefix}${cmd.name}*` +
                   `\n📝 ${cmd.description}` +
                   `\n🔒 ${cmd.ownerOnly ? 'Owner Only' : cmd.adminOnly ? 'Admin Only' : 'Public'}\n`;
    });

    helpText += `\n📌 _Reply to a command with ${config.prefix}help for more info_`;

    await client.sendMessage(remoteJid, { 
        text: helpText,
        quoted: message 
    });
}