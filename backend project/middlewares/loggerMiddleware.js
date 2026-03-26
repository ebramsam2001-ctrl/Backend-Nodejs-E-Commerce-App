const fs = require('fs');
const path = require('path');

// التأكد من وجود مجلد الـ logs، وإذا لم يوجد يتم إنشاؤه
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        const timestamp = new Date().toISOString();

        const logEntry = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms\n`;

        // 1. الإظهار في الـ Console (للمتابعة الفورية)
        console.log(logEntry.trim());

        // 2. الكتابة في الملف (أرشيف دائم)
        // 'a' تعني append (إضافة في نهاية الملف دون مسح القديم)
        const logFile = path.join(logDir, 'access.log');
        fs.appendFile(logFile, logEntry, (err) => {
            if (err) console.error("Failed to write to log file:", err);
        });
    });

    next();
};

module.exports = logger;