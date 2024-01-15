
const { processFileUpload } = require("../../middleware/uploadMiddleware");
const { getUserByToken } = require("../User/userService");
const { createSound, removeSound } = require("./soundService");

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
    }
}

module.exports = soundController;