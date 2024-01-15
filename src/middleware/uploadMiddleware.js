const multer = require('multer');
const sharp = require('sharp');
const path = require("path")
const storage = multer.memoryStorage();
const soundStorage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, 'soundsfiles');
    },
    filename: function (requset, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extension);
    }
});

const imgUpload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }).single('userImg');
const audioUpload = multer({ storage: soundStorage }).single('userFile');

const processFileUpload = async (userImg, isSound = true) => {
    if (!userImg) return null;

    const filename = userImg.originalname;
    const encodedFilename = encodeURIComponent(filename);
    const baseFilePath = `http://localhost:3000/api/${isSound ? 'sound/file' : 'user/profile/img/thumbnail'}_${encodedFilename}`;
    
    const sanitizedFilename = encodedFilename.replace(/[/\\?%*:|"<>]/g, '');

    try {
        if (isSound) {
            console.log('Processing sound file...');
        } else {
            // 이미지 파일인 경우에는 sharp로 처리
            await sharp(userImg.buffer)
                .resize(250, 250)
                .jpeg({ quality: 100 })
                .toFile(`./profiles/thumbnail_${sanitizedFilename}`);
            console.log('Processing image file...');
        }
    } catch (err) {
        console.error(`Error processing file:`, err);
    }

    return baseFilePath;
};

module.exports = { imgUpload,audioUpload, processFileUpload };
