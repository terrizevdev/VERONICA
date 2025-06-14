// commands/mute.js
export const name = 'mute';
export const description = 'Mute the group for specific time';
export const ownerOnly = false;
export const groupOnly = true;
export const adminOnly = true;
export const botAdminOnly = true;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const time = parseInt(args[0]) || 60; // Default 60 minutes

    if (time > 1440) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Maximum mute time is 24 hours (1440 minutes)',
            quoted: message 
        });
    }

    try {
        const muteUntil = Math.floor(Date.now() / 1000) + (time * 60);
        await client.groupSettingUpdate(remoteJid, 'announcement');
        await client.sendMessage(remoteJid, { 
            text: `🔇 Group muted for ${time} minutes\n⏰ Until: ${new Date(muteUntil * 1000).toLocaleString()}`,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to mute group. Make sure I am admin!',
            quoted: message 
        });
    }
}