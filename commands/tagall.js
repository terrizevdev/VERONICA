// commands/tagall.js
export const name = 'tagall';
export const description = 'Mention all group members';
export const ownerOnly = false;
export const groupOnly = true; // Only works in groups
export const adminOnly = true; // Only admins can use
export const botAdminOnly = true; // Bot needs to be admin

export async function execute(message, client) {
    const remoteJid = message.key.remoteJid;
    
    try {
        const metadata = await client.groupMetadata(remoteJid);
        const participants = metadata.participants;
        
        let mentionText = '👥 *All Members Mention* 👥\n\n';
        participants.forEach(participant => {
            mentionText += `@${participant.id.split('@')[0]} `;
        });
        
        const mentionedJid = participants.map(p => p.id);
        
        await client.sendMessage(remoteJid, { 
            text: mentionText,
            mentions: mentionedJid,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to tag all members. Make sure I am admin!',
            quoted: message 
        });
    }
}