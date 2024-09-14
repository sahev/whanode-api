/* eslint-disable no-unsafe-optional-chaining */
const { WhatsAppInstance } = require('../class/instance')
const logger = require('pino')()
const config = require('../../config/config')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fs = require('fs').promises;

class Session {
    async restoreSessions() {
        let restoredSessions = new Array();
        let allSessions = [];

        try {
        const filePath = 'db/sessions.json';


            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

            if (fileExists) {

                const data = await fs.readFile(filePath, 'utf-8');
                allSessions = JSON.parse(data);
            } else {

                await fs.writeFile(filePath, '[]', 'utf-8');
            }
            const data = await fs.readFile('db/sessions.json', 'utf-8');
            allSessions = JSON.parse(data);




            allSessions.forEach(async (sessionData) => {

                const { key, webhook, webhookUrl, webhooks } = sessionData;
                const instance = new WhatsAppInstance(key, webhook, webhookUrl, webhooks);
                await instance.init();
                WhatsAppInstances[key] = instance;
                restoredSessions.push(key);
				await sleep(150);
            });
        } catch (e) {
            logger.error('Error restoring sessions');
            logger.error(e);
        }

        return restoredSessions;
    }

    async restoreSession(instance_key) {
        let restoredSession;
        let allSessions = [];

        try {
        const filePath = 'db/sessions.json';

            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

            if (fileExists) {

                const data = await fs.readFile(filePath, 'utf-8');
                allSessions = JSON.parse(data);
            } else {

                await fs.writeFile(filePath, '[]', 'utf-8');
            }
            const data = await fs.readFile('db/sessions.json', 'utf-8');

            allSessions = JSON.parse(data);

            allSessions.forEach(async (sessionData) => {
                const { key, webhook, webhookUrl, webhooks } = sessionData;

                if (key == instance_key) {
                    const instance = new WhatsAppInstance(key, webhook, webhookUrl, webhooks);
                    await instance.init();
                    WhatsAppInstances[key] = instance;
                    // restoredSession.push(key);
                    restoredSession = { ...key };
                    await sleep(150);
                }

            });
        } catch (e) {
            logger.error('Error restoring sessions');
            logger.error(e);
        }

        return restoredSession;
    }
}

exports.Session = Session;
