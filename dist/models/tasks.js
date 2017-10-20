'use strict';
let moment = require("moment");
module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type : DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : true, 
        min: -90,
        max: 90
      }
    },
     priod: {
      type : DataTypes.DATE,
      validate : {
      },
      get : function(value){
        return moment(this.getDataValue(value)).format("YYYY-MM-DD HH:mm:ss");
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