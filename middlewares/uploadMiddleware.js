const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (request, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const fileFilter = (request, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;