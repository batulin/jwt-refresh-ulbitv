const {Token} = require("../models/models");

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({userId: userId})
        if (tokenData) {
            const token = await Token.update({ refreshToken: refreshToken }, {
                where: {
                    userId: userId
                }
            });
            return token;
        }

        const token = await Token.create({userId: userId, refreshToken: refreshToken})
        return token;
    }
}

module.exports = new TokenService();