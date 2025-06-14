// commands/unmute.js
export const name = 'unmute';
export const description = 'Unmute the group';
export const ownerOnly = false;
export const groupOnly = true;
export const adminOnly = true;
export const botAdminOnly = true;

export async function execute(message, client) {
    const remoteJid = message.key.remoteJid;

    try {
        await client.groupSettingUpdate(remoteJid, 'not_announcement');
        await client.sendMessage(remoteJid, { 
            text: '🔊 Group unmuted!',
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to unmute group. Make sure I am admin!',
            quoted: message 
        });
    }
}