const multer = require('multer');
const sharp = require('sharp');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits:{fileSize: 10 * 1024 * 1024} }).single('userImg');

const processFileUpload = async (userImg) => {
    if (!userImg) return null;

    const filename = userImg.originalname;
    const encodedFilename = encodeURIComponent(filename);

    
    const thumbnailFilePath = `http://localhost:3000/api/user/profile/img/thumbnail_${encodedFilename}`;

    
    const sanitizedFilename = encodedFilename.replace(/[/\\?%*:|"<>]/g, '');

    try {
        
        await sharp(userImg.buffer)
            .resize(250, 250)
            .jpeg({ quality: 100 })
            .toFile(`./profiles/thumbnail_${sanitizedFilename}`);
    } catch (err) {
        console.error(`Error processing file:`, err);
    }

    return thumbnailFilePath;
};

module.exports = { upload, processFileUpload };
