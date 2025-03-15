const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../../", "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Check and create directory again in case it was deleted
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Allowed file types
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Custom file filter to handle unsupported formats
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
    }
};


const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

const uploadErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            success: false,
            message: `Invalid file type. Allowed types: JPEG, PNG, WEBP.`,
            accepted_types: allowedMimeTypes,
            status_code: 400
        });
    }
    next(err);
};

module.exports = {
    upload,
    uploadErrorHandler,
};
