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

    return await sound.save();
};


const removeSound = async ({soundId, accountId}) => {
    return await Sound.findOneAndDelete({accountId: accountId, _id: soundId})
   
}

module.exports = { createSound,removeSound };