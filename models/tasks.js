'use strict';
module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: DataTypes.STRING,
    priod: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tasks;
};