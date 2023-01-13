'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      booking.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });

      booking.belongsTo(models.service, {
        as: "service",
        foreignKey: {
          name: "idService",
        },
      });
      
    }
  }
  booking.init({
    idService: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    schedule: DataTypes.DATE,
    jumlah_booking: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};