
const { processFileUpload } = require("../../middleware/uploadMiddleware");
const { getUserByToken } = require("../User/userService");
const { createSound, removeSound, totalSoundCounts, getPaginatedSounds } = require("./soundService");

const soundController = {
    upload : async (req, res) => {
        const { soundName,category, tags } = req.body
        const soundfile = req.file
        const token = req.headers.token;
        
        try {
            const user = await getUserByToken(token);

            if(!soundfile) return res.send("Pleas upload the Sound File.")
            
            const filePath = await processFileUpload(soundfile, true);
            const soundData = {
                accountId : user._id,
                soundName,
                category,
                tags,
                fileName: soundfile.filename,
                filePath,
            }

            const sound = await createSound(soundData);
            return res.send({
                result: "File Susccesfully uploaded.",
                sound,
            });
            
        } catch (error) {
            console.error("Error uploading sound:", error);
            return res.status(500).send("Internal Server Error");
        }
    },
    remove: async(req, res) => {
        const {soundId} = req.body
        const token = req.headers.token
        const user = await getUserByToken(token)

        if(user) {
            const sound = await removeSound({accountId: user._id, soundId : soundId})
            return res.send({sound})
        }
    },
    getSoundList : async (req, res) => {
        const page = parseInt(req.query.page || '1', 10);
        const sounds = await getPaginatedSounds(page);
        const totalCounts = await totalSoundCounts();
        const lastPage = Math.ceil(totalCounts / 10);
        const data = { totalCounts, lastPage, sounds };
        return res.send(data);
    },
    getMySoundList: async (req, res) => {
        try {
            const token = req.headers.token;
            const user = await getUserByToken(token);
    
            if (user) {
                const page = parseInt(req.query.page || '1', 10);
                const sounds = await getPaginatedSounds(page, { accountId: user._id });
                const totalCounts = await totalSoundCounts();
                const lastPage = Math.ceil(totalCounts / 10);
                const data = { totalCounts, lastPage, sounds };
                return res.send(data);
            } else {
                return res.status(401).send("Invalid token or user not found");
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = soundController;