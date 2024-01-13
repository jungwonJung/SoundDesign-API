const Sound = require("../../../config/db/models/soundModel");

const createSound = async ({ accountId, soundName, category, tags, fileName, filePath }) => {
    const sound = new Sound({
        accountId,
        soundName,
        category,
        tags,
        fileName,
        filePath,
        created: Date.now(),
    });

    return sound.save();
};

module.exports = { createSound };