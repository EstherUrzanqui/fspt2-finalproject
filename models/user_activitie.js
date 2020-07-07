'use strict'
const { Model } = require('sequelize')
const user = require('./user')
const activitie = require('./activitie')
module.exports = (sequelize, DataTypes) => {
  class user_activitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //activitie.belongsTo(models.user)
    }
  }
  user_activitie.init(
    {
      activityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_activitie',
    }
  )
  return user_activitie
}
