const { tokenDecode } = require('./tokenService'); 

const tokenController = {
    decode: async (req, res) => {
        try {
            const token = req.headers.token;

            if (!token) {
                return res.status(400).json({ message: "Token is missing in the request headers." });
            }

            const decodedToken = await tokenDecode(token);

            return res.status(200).json(decodedToken);
        } catch (error) {
            console.error("Error in decoding token:", error);
            return res.status(500).json({ message: "Error decoding token." });
        }
    }
};

module.exports = tokenController;
