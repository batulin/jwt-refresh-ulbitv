const {User} = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require('./tokenService');
const UserDto = require('../dto/userDto');
class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует!');
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email: email, password: hashedPassword });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(tokens.refreshToken);

        return {...tokens, user:userDto}
    }
}

module.exports = new UserService();