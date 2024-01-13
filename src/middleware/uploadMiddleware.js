// file upload middle ware
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const processFileUpload = async (userImg) => {
  if (!userImg) return null;

  const filename = userImg.originalname;
  const filePath = `http://localhost:3000/api/user/profile/img/thumbnail_${filename}`;

  await sharp(userImg.buffer)
    .resize(250, 250)
    .jpeg({ quality: 100 })
    .toFile(`./profiles/thumbnail_${filename}`);

  const removepath = './profiles/' + filename;

  fs.unlink(removepath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });

  return filePath;
};

module.exports = { upload, processFileUpload };
