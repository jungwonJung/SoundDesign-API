const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits:{fileSize: 10 * 1024 * 1024} }).single('userImg');

const processFileUpload = async (userImg, isSound = true) => {
    if (!userImg) return null;

    const filename = userImg.originalname;
    const encodedFilename = encodeURIComponent(filename);
    const baseFilePath = `http://localhost:3000/api/${isSound ? 'sound/file' : 'user/profile/img/thumbnail'}_${encodedFilename}`;
    
    const sanitizedFilename = encodedFilename.replace(/[/\\?%*:|"<>]/g, '');

    try {
        const sharpProcess = isSound
            ? sharp(userImg.buffer).toFile(`./files/${sanitizedFilename}`)
            : sharp(userImg.buffer)
                .resize(250, 250)
                .jpeg({ quality: 100 })
                .toFile(`./profiles/thumbnail_${sanitizedFilename}`);

        await sharpProcess;
    } catch (err) {
        console.error(`Error processing file:`, err);
    }

    return baseFilePath;
};

module.exports = { upload, processFileUpload };
