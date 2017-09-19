'use strict';
module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [3,10],
          msg : "nagai"
        }
      }
    },
     priod: {
      type : DataTypes.DATE,
      validate : {
        len : {
          args : [3,10],
          msg : "nagai"
        }
      }
    }
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