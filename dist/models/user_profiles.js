'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_profiles = sequelize.define('user_profiles', {
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    first_name: {
      type : DataTypes.STRING,
      validate :{
        //len: { args : [2,10], msg : "error" },
      }
    },
    last_name: DataTypes.STRING,
    first_name_kana: DataTypes.STRING,
    last_name_kana: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_profiles;
};