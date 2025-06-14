// utils/isAdmins.js
export async function isAdmins(client, remoteJid) {
    try {
        const groupMetadata = await client.groupMetadata(remoteJid);
        const participants = groupMetadata.participants;
        return participants.filter(p => p.admin !== null).map(p => p.id);
    } catch {
        return [];
    }
}