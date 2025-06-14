// commands/owner.js
import config from '../config.js';

export const name = 'owner';
export const description = 'Show bot owner information';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const ownerNumbers = config.owners.map(num => num.split('@')[0]);
    await client.sendMessage(message.key.remoteJid, { 
        text: `🤖 *Bot Owner*\n\n` +
              `📌 *Name*: ${config.name}\n` +
              `📞 *Contact*: ${ownerNumbers.join(', ')}\n\n` +
              `_This command is restricted to owner only._`,
        quoted: message 
    });
}