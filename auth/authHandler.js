// auth/authHandler.js
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import readline from 'readline';

async function promptUserNumber() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('📱 Enter your WhatsApp number (with country code, e.g., 1234567890): ', (number) => {
            rl.close();
            resolve(number.trim());
        });
    });
}

async function connectToWhatsApp(handleMessage) {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const sock = makeWASocket({ 
        auth: state,
        syncFullHistory: false 
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) connectToWhatsApp(handleMessage);
        } else if (connection === 'open') {
            console.log("✅ WhatsApp connection established");
        }
    });

    setTimeout(async () => {
        if (!state.creds.registered) {
            try {
                const number = await promptUserNumber();
                console.log(`🔢 Requesting pairing code for ${number}`);
                const code = await sock.requestPairingCode(number);
                console.log(`📲 Pairing Code: ${code}`);
                console.log('📱 Enter this code in your WhatsApp linked devices to pair.');
            } catch (error) {
                console.error('❌ Error requesting pairing code:', error.message);
            }
        }
    }, 5000);

    return sock;
}

export default connectToWhatsApp;