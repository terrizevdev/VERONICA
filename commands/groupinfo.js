// commands/groupinfo.js
export const name = 'groupinfo';
export const description = 'Show group information';
export const ownerOnly = false;
export const groupOnly = true; // Only works in groups
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const remoteJid = message.key.remoteJid;
    
    try {
        const metadata = await client.groupMetadata(remoteJid);
        const admins = metadata.participants.filter(p => p.admin).map(p => p.id.split('@')[0]);
        
        const infoText = `👥 *Group Info*\n\n` +
                         `📌 *Name*: ${metadata.subject}\n` +
                         `🆔 *ID*: ${metadata.id}\n` +
                         `👤 *Participants*: ${metadata.participants.length}\n` +
                         `👑 *Admins*: ${admins.length}\n` +
                         `📅 *Created*: ${new Date(metadata.creation * 1000).toLocaleDateString()}\n` +
                         `🔗 *Invite Link*: ${metadata.inviteLink || 'Not available'}`;
        
        await client.sendMessage(remoteJid, { 
            text: infoText,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to fetch group info',
            quoted: message 
        });
    }
}