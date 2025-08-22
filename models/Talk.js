const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Talk = db.define('Talk', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    rating: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})
Talk.belongsTo(User)
User.hasMany(Talk)

module.exports = Talk