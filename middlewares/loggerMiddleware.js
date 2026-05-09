const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = (request, response, next) => {
    const start = Date.now();

    response.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = request;
        const { statusCode } = response;
        const timestamp = new Date().toISOString();

        const logEntry = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms\n`;

        console.log(logEntry.trim());

        const logFile = path.join(logDir, 'access.log');
        fs.appendFile(logFile, logEntry, (err) => {
            if (err) console.error("Failed to write to log file:", err);
        });
    });

    next();
};

module.exports = logger;