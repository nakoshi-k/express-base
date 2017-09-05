'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    caption: DataTypes.TEXT,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return items;
};