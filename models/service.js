'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // belongsTo to model user
      service.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      // hasMany to model transaction
      service.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idService",
        },
      });

      // hasMany to model booking
      service.hasMany(models.booking, {
        as: "bookingServices",
        foreignKey: {
          name: "idService",
        },
      });

      // belongsToMany to model category
      service.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "categoryService",
          as: "bridge",
        },
        foreignKey: {
          name: "idService",
        },
      });
    }
  }
  service.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};