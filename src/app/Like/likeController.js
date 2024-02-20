const { likeService } = require("../services/likeService");

const likeController = {
    like: async (req, res) => {
        try {
            const { soundId } = req.body;
            const token = req.headers.token;
            await likeService.like(soundId, token);
            res.status(200).json({ message: "Like action completed successfully" });
        } catch (error) {
            console.error("Error while processing like action:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = { likeController };