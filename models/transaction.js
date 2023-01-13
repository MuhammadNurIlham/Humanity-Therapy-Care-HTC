'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      transaction.belongsTo(models.service, {
        as: "service",
        foreignKey: {
          name: "idService",
        },
      });

      transaction.belongsTo(models.user, {
        as: "buyer",
        foreignKey: {
          name: "idBuyer",
        },
      });

      transaction.belongsTo(models.user, {
        as: "seller",
        foreignKey: {
          name: "idSeller",
        },
      });
    }
  }
  transaction.init({
    idService: DataTypes.INTEGER,
    idBuyer: DataTypes.INTEGER,
    idSeller: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};