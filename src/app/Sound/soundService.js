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


const getPaginatedSounds = async (_page, filter = {}) => {
    const page = parseInt(_page || '1', 10);
    return await Sound.find(filter).sort({ created: -1 }).limit(10)
        .skip((page - 1) * 10)
        .exec();
}

const totalSoundCounts = async () => {
    return await Sound.countDocuments()
}

module.exports = { createSound,removeSound,getPaginatedSounds,totalSoundCounts };