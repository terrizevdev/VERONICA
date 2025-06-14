// commands/ping.js
export const name = 'ping';
export const description = 'Check bot latency';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const start = Date.now();
    await client.sendMessage(message.key.remoteJid, { text: '🏓 Pong!' });
    const end = Date.now();
    const latency = end - start;
    
    await client.sendMessage(message.key.remoteJid, { 
        text: `🏓 Pong!\n⏱️ Latency: ${latency}ms`,
        quoted: message 
    });
}