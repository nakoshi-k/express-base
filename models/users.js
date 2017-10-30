'use strict';
let bcrypt = require("bcrypt");
var hashPasswordHook = function(user, options, callback) {
    bcrypt.hash(user.get('new_password'), 10, function(err, hash) {
      if (err) {
        return callback(err);
      }
      user.set('password', hash);
      return callback(null, options);
    });
};

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: { 
      type : DataTypes.STRING
    },
    group_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    new_password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: {
          args : [8,64],
          msg : "パスワードは8文字から64文字までで入力してください。"
        },

      }
    },
    confirm_password: {
      type: DataTypes.VIRTUAL,
      validate: {
         
      }
    },
  }, {
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook,
    },
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        users.belongsTo(models.groups, { foreignKey: 'group_id'} );
      }
    },
    instanceMethods: {
      authenticate: function(password, callback) {
        let auth = (resolve,reject) =>  {
          bcrypt.compare(password, this.password, function(err,same){
            if (err) {
              reject(err);
              return;
            }
            if(same){
              resolve(true);
              return;
            }
            reject("invalid password");
          });
        }
        return new Promise(auth)
      },
    },
    /* model validation */
    validate: {
      isEvenPassword() {
        if (this.new_password !== this.confirm_password ) {
          throw new Error('確認用 パスワードが一致していません。')
        }
      }
    }
  });

  return users;
};