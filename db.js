const {Sequelize} = require('sequelize');

module.exports = new Sequelize(`postgres://symfony:symfony@localhost/symfony`,
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432
    }
)