// main.js
import authHandler from './auth/authHandler.js';
import messageHandler from './handlers/messageHandler.js';
import { loadCommands } from './handlers/commandHandler.js';

(async () => {
    await loadCommands();
    await authHandler(messageHandler);
})();