const Sequelize  = require("sequelize")
const database = require('../database/db')

const users = database.define('user_editor',{
    ID: {type:Sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    email: {type: Sequelize.STRING},
    pass: {type: Sequelize.STRING}
});
users.sync();

module.exports = users;