
const { processFileUpload } = require("../../middleware/uploadMiddleware");
const { getUserByToken } = require("../User/userService");

const soundController = {
    upload : async (req, res) => {
        const { soundName,category, tags } = req.body
        const soundfile = request.file
        const token = req.headers.token;
        
        try {
            const user = await getUserByToken(token);

            if(!soundfile) return req.send("Pleas upload the Sound File.")
            
            const filePath = await processFileUpload(soundfile);
            const soundData = {
                soundName,
                category,
                tags,
                fileName: soundfile.filename,
                filePath,
            }

            const sound = await createSound(savestatus);
            return res.send({
                result: "File Susccesfully uploaded.",
                sound,
            });
            
        } catch (error) {
            console.error("Error uploading sound:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = soundController;