const { getUserByToken } = require('../User/userService');


const likeService = {
    like: async (soundId, token) => {
        try {
            const user = await getUserByToken(token); 
            const sound = await Sound.findOne({ _id: soundId });
            const like = await Like.findOne({ soundId: soundId, accountId: user._id });
            
            if (!like) {
                const newLike = new Like({
                    accountId: user._id,
                    soundId: sound._id,
                    created: Date.now(),
                    updated: Date.now(),
                    isDeleted: false
                });
                await newLike.save();
                await Sound.updateOne({ _id: soundId }, { $inc: { likeCount: 1 } });
            } else {
                await Like.deleteOne({ _id: like._id });
                await Sound.updateOne({ _id: soundId }, { $inc: { likeCount: -1 } });
            }
        
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { likeService };
