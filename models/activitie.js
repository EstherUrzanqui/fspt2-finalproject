'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class activitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //activitie.belongsTo(models.user)
    }
  }
  activitie.init(
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      startHour: DataTypes.TIME,
      endHour: DataTypes.TIME,
      hostingId: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
      latitude: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      picture: DataTypes.TEXT,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'activitie',
    }
  )
  return activitie
}
