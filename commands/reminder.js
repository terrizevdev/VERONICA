// commands/reminder.js
import { setTimeout as setTimeoutAsync } from 'timers/promises';

export const name = 'reminder';
export const description = 'Set a reminder';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const time = parseInt(args[0]);
    const reminderText = args.slice(1).join(' ');

    if (!time || !reminderText) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Usage: !reminder <minutes> <text>\nExample: !reminder 30 Drink water',
            quoted: message 
        });
    }

    if (time > 1440) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Maximum reminder time is 24 hours (1440 minutes)',
            quoted: message 
        });
    }

    await client.sendMessage(remoteJid, { 
        text: `⏰ Reminder set for ${time} minute(s)\n\n` +
              `📝 Text: ${reminderText}`,
        quoted: message 
    });

    await setTimeoutAsync(time * 60000);
    
    await client.sendMessage(remoteJid, { 
        text: `🔔 REMINDER:\n\n${reminderText}`,
        mentions: [message.key.participant || message.key.remoteJid]
    });
}